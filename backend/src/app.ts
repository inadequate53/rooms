import Fastify, { type FastifyError } from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import { STATUS_CODES } from "node:http";
import prismaPlugin from "./plugins/prisma.js";
import { Type as T } from "typebox";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { ValidationProblem, ProblemDetails, User, Health } from "./types.js";
import { BookingCreateBody, BookingDto } from "./types.js";
import { BookingListItemDto } from "./types.js";

// Этот модуль собирает все настройки Fastify: плагины инфраструктуры, обработчики ошибок и маршруты API.

/**
 * Создает и настраивает экземпляр Fastify, готовый к запуску.
 */
export async function buildApp() {
  const app = Fastify({
    logger: true, // Подключаем встроенный логгер Fastify.
    trustProxy: true, // Разрешаем доверять заголовкам X-Forwarded-* от прокси/ingress.
    /**
     * Схема валидации TypeBox -> Fastify генерирует массив ошибок.
     * Мы превращаем его в ValidationProblem, чтобы вернуть клиенту единый формат Problem Details.
     */
    schemaErrorFormatter(errors, dataVar) {
      const msg =
        errors
          .map((e) => e.message)
          .filter(Boolean)
          .join("; ") || "Validation failed";
      return new ValidationProblem(msg, errors, dataVar);
    },
  }).withTypeProvider<TypeBoxTypeProvider>(); // Позволяет Fastify понимать типы TypeBox при описании схем.

  // === Инфраструктурные плагины ===

  // Helmet добавляет безопасные HTTP-заголовки (Content-Security-Policy, X-DNS-Prefetch-Control и др.).
  await app.register(helmet);

  // CORS ограничивает кросс-доменные запросы. Здесь полностью запрещаем их (origin: false) по умолчанию.
  await app.register(cors, { origin: false });

  /**
   * Ограничитель количества запросов на IP.
   * Плагин автоматически вернет 429, а мы формируем Problem Details в errorResponseBuilder.
   */
  await app.register(rateLimit, {
    max: 100, // Максимум 100 запросов
    timeWindow: "1 minute", // За одну минуту
    enableDraftSpec: true, // Добавляет стандартные RateLimit-* заголовки в ответ
    addHeaders: {
      "x-ratelimit-limit": true,
      "x-ratelimit-remaining": true,
      "x-ratelimit-reset": true,
      "retry-after": true,
    },
    errorResponseBuilder(request, ctx) {
      const seconds = Math.ceil(ctx.ttl / 1000);
      return {
        type: "about:blank",
        title: "Too Many Requests",
        status: 429,
        detail: `Rate limit exceeded. Retry in ${seconds} seconds.`,
        instance: request.url,
      } satisfies ProblemDetails;
    },
  });

  /**
   * Документация API в формате OpenAPI 3.0.
   */
  await app.register(swagger, {
    openapi: {
      openapi: "3.0.3",
      info: {
        title: "Rooms API",
        version: "1.0.0",
        description: "HTTP-API, совместим с RFC 9457.",
      },
      servers: [{ url: "http://localhost:3000" }],
      tags: [
        {
          name: "Users",
          description: "Маршруты для управления пользователями",
        },
        { name: "System", description: "Служебные эндпоинты" },
      ],
    },
  });

  // Плагин с PrismaClient: открывает соединение с БД и добавляет app.prisma во все маршруты.
  await app.register(prismaPlugin);

  // === Глобальные обработчики ошибок ===

  /**
   * Единая точка обработки ошибок. Мы приводим их к Problem Details и отправляем клиенту JSON.
   * ValidationProblem превращается в 400, остальные ошибки хранят свой статус или получают 500.
   */
  app.setErrorHandler<FastifyError | ValidationProblem>((err, req, reply) => {
    const status = typeof err.statusCode === "number" ? err.statusCode : 500;
    const isValidation = err instanceof ValidationProblem;

    const problem = {
      type: "about:blank",
      title: STATUS_CODES[status] ?? "Error",
      status,
      detail: err.message || "Unexpected error",
      instance: req.url,
      ...(isValidation ? { errorsText: err.message } : {}),
    };

    reply.code(status).type("application/problem+json").send(problem);
  });

  // Отдельный обработчик 404: отвечает в формате Problem Details.
  app.setNotFoundHandler((request, reply) => {
    reply
      .code(404)
      .type("application/problem+json")
      .send({
        type: "about:blank",
        title: "Not Found",
        status: 404,
        detail: `Route ${request.method} ${request.url} not found`,
        instance: request.url,
      } satisfies ProblemDetails);
  });

  // === Маршруты API ===

  /**
   * GET /api/users — примеры чтения данных из базы через Prisma.
   */
  app.get(
    "/api/users",
    {
      schema: {
        operationId: "listUsers",
        tags: ["Users"],
        summary: "Возвращает список пользователей",
        description: "Получаем id и email для каждого пользователя.",
        response: {
          200: {
            description: "Список пользователей",
            content: { "application/json": { schema: T.Array(User) } },
          },
          429: {
            description: "Too Many Requests",
            headers: {
              "retry-after": {
                schema: T.Integer({
                  minimum: 0,
                  description: "Через сколько секунд можно повторить запрос",
                }),
              },
            },
            content: { "application/problem+json": { schema: ProblemDetails } },
          },
          500: {
            description: "Internal Server Error",
            content: { "application/problem+json": { schema: ProblemDetails } },
          },
        },
      },
    },
    async (_req, _reply) => {
      // Prisma автоматически превращает результат в Promise; Fastify вернет массив как JSON.
      return app.prisma.user.findMany({ select: { id: true, email: true } });
    }
  );

  const AuditoriumDto = T.Object({
    id: T.String(),
    name: T.String(),
    capacity: T.Union([T.Integer(), T.Null()]), // <-- ключевая правка
  });

  app.get(
    "/api/auditoriums",
    {
      schema: {
        tags: ["System"],
        summary: "Список аудиторий",
        response: {
          200: T.Array(AuditoriumDto),
          500: ProblemDetails,
        },
      },
    },
    async () => {
      return app.prisma.auditorium.findMany({
        select: { id: true, name: true, capacity: true },
      });
    }
  );


  // POST /api/bookings — создать бронирование
  app.post(
    "/api/bookings",
    {
      schema: {
        tags: ["System"],
        summary: "Создать бронирование",
        body: BookingCreateBody,
        response: {
          201: { content: { "application/json": { schema: BookingDto } } },
          400: {
            content: { "application/problem+json": { schema: ProblemDetails } },
          },
          409: {
            content: { "application/problem+json": { schema: ProblemDetails } },
          },
          500: {
            content: { "application/problem+json": { schema: ProblemDetails } },
          },
        },
      },
    },
    async (req, reply) => {
      const b = req.body;

      const startsAt = new Date(b.startsAt);
      const endsAt = new Date(b.endsAt);
      if (
        !(startsAt instanceof Date) ||
        isNaN(startsAt.getTime()) ||
        !(endsAt instanceof Date) ||
        isNaN(endsAt.getTime())
      ) {
        reply
          .code(400)
          .type("application/problem+json")
          .send({
            type: "about:blank",
            title: "Bad Request",
            status: 400,
            detail: "Invalid startsAt/endsAt",
            instance: req.url,
          } satisfies ProblemDetails);
        return;
      }
      if (endsAt <= startsAt) {
        reply
          .code(400)
          .type("application/problem+json")
          .send({
            type: "about:blank",
            title: "Bad Request",
            status: 400,
            detail: "endsAt must be greater than startsAt",
            instance: req.url,
          } satisfies ProblemDetails);
        return;
      }

      // Простая защита от пересечений по основной аудитории:
      const overlap = await app.prisma.booking.findFirst({
        where: {
          mainAuditoriumId: b.mainAuditoriumId,
          AND: [
            { startsAt: { lt: endsAt } }, // existing starts before new ends
            { endsAt: { gt: startsAt } }, // existing ends after new starts
          ],
        },
        select: { id: true },
      });

      if (overlap) {
        reply
          .code(409)
          .type("application/problem+json")
          .send({
            type: "https://example.com/problems/conflict",
            title: "Conflict",
            status: 409,
            detail: "Time slot is already booked for the selected auditorium",
            instance: req.url,
          } satisfies ProblemDetails);
        return;
      }

      const created = await app.prisma.booking.create({
        data: {
          title: b.title,
          eventType: b.eventType,
          subject: b.subject ?? null,
          format: b.format as any,
          description: b.description ?? null,

          startsAt,
          endsAt,

          mainAuditoriumId: b.mainAuditoriumId,
          reserveAuditoriumId: b.reserveAuditoriumId ?? null,

          organizerName: b.organizerName,
          organizerPosition: b.organizerPosition ?? null,
          expectedCount: b.expectedCount ?? null,
          participantType: b.participantType ?? null,
          groups: b.groups ?? [],
        },
      });

      reply.code(201).send({
        ...created,
        startsAt: created.startsAt.toISOString(),
        endsAt: created.endsAt.toISOString(),
        createdAt: created.createdAt.toISOString(),
      });
    }
  );

  // GET /api/bookings — список бронирований (для таблицы)
  app.get(
    "/api/bookings",
    {
      schema: {
        tags: ["System"],
        summary: "Список бронирований",
        response: {
          200: T.Array(BookingListItemDto),
          500: ProblemDetails,
        },
      },
    },
    async () => {
      const items = await app.prisma.booking.findMany({
        orderBy: { startsAt: "desc" },
        include: {
          mainAuditorium: { select: { name: true } },
          reserveAuditorium: { select: { name: true } },
        },
      });

      return items.map((x) => ({
        id: x.id,
        title: x.title,
        eventType: x.eventType,
        subject: x.subject ?? null,
        format: x.format as any,
        description: x.description ?? null,

        startsAt: x.startsAt.toISOString(),
        endsAt: x.endsAt.toISOString(),

        mainAuditoriumId: x.mainAuditoriumId,
        mainAuditoriumName: x.mainAuditorium.name,

        reserveAuditoriumId: x.reserveAuditoriumId ?? null,
        reserveAuditoriumName: x.reserveAuditorium?.name ?? null,

        organizerName: x.organizerName,
        organizerPosition: x.organizerPosition ?? null,
        expectedCount: x.expectedCount ?? null,
        participantType: x.participantType ?? null,

        groups: x.groups ?? [],
        createdAt: x.createdAt.toISOString(),
      }));
    }
  );

  /**
   * GET /api/health — health-check для мониторинга.
   * Пытаемся сделать минимальный запрос в БД. Если БД недоступна, возвращаем 503.
   */
  app.get(
    "/api/health",
    {
      schema: {
        operationId: "health",
        tags: ["System"],
        summary: "Health/Readiness",
        description: "Проверяет, что процесс жив и база данных отвечает.",
        response: {
          200: {
            description: "Ready",
            content: { "application/json": { schema: Health } },
          },
          503: {
            description: "Temporarily unavailable",
            content: { "application/problem+json": { schema: ProblemDetails } },
          },
          429: {
            description: "Too Many Requests",
            headers: {
              "retry-after": { schema: T.Integer({ minimum: 0 }) },
            },
            content: { "application/problem+json": { schema: ProblemDetails } },
          },
          500: {
            description: "Internal Server Error",
            content: { "application/problem+json": { schema: ProblemDetails } },
          },
        },
      },
    },
    async (_req, reply) => {
      try {
        // Если SELECT 1 прошел — сервис готов.
        await app.prisma.$queryRaw`SELECT 1`;
        return { ok: true } as Health;
      } catch {
        // Возвращаем 503, чтобы условный балансировщик мог вывести инстанс из ротации.
        reply
          .code(503)
          .type("application/problem+json")
          .send({
            type: "https://example.com/problems/dependency-unavailable",
            title: "Service Unavailable",
            status: 503,
            detail: "Database ping failed",
            instance: "/api/health",
          } satisfies ProblemDetails);
      }
    }
  );

  // Служебный маршрут: возвращает OpenAPI-спецификацию.
  app.get(
    "/openapi.json",
    {
      schema: { hide: true, tags: ["Internal"] }, // Скрыт из списка, но доступен для клиентов/тестов
    },
    async (_req, reply) => {
      reply.type("application/json").send(app.swagger());
    }
    );

  return app;
}




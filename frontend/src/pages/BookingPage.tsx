// src/pages/BookingPage.tsx
import {
  Box,
  Button,
  Container,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import React, { useEffect, useState } from "react";

import { PageHeader } from "@/components/common/PageHeader";
import { MainInfoSection } from "@/components/BookingPage/MainInfoSection/MainInfoSection";
import { BookingSummary } from "@/components/BookingPage/BookingSummary";
import { DateTimeSection } from "@/components/BookingPage/DateTimeSection/DateTimeSection";
import { BookingStatus } from "@/components/BookingPage/BookingStatus/BookingStatus";
import { AudienceSelectionSection } from "@/components/BookingPage/AudienceSelectionSection";
import { ParticipantsSection } from "@/components/BookingPage/ParticipantsSection";
import { BookingActions } from "@/components/BookingPage/BookingActions";

import { fetchAuditoriums, type AuditoriumDto } from "@/api/auditoriumsApi";
import {
  createBooking,
  updateBooking,
  fetchBooking,
  type BookingCreateBody,
  type BookingDto,
} from "@/api/bookingsApi";

import { FormProvider, useForm } from "react-hook-form";

type SectionKey = "mainInfo" | "dateTime" | "audience" | "participants";

type BookingPageProps = {
  bookingId: string | null; // null => create, string => edit
  onDone: () => void; // return back (e.g. to catalog)
};

type BookingFormValues = {
  // MainInfoSection
  title: string;
  eventType: "lecture" | "seminar" | "lab" | "other";
  subject: string;
  format: "offline" | "online" | "hybrid";
  description: string;

  // DateTimeSection
  startDate: string; // yyyy-mm-dd
  endDate: string; // yyyy-mm-dd
  startTime: string; // HH:mm
  endTime: string; // HH:mm

  // Audience (RHF!)
  mainAuditoriumId: string;
  reserveAuditoriumId: string;

  // Participants
  organizerName: string;
  organizerPosition: string;
  expectedCount: string;
  participantType: "students" | "teachers" | "guests" | "mixed" | "";
  groupInput: string;
  groups: string[];
};

interface SectionStatusState {
  mainInfo: boolean;
  dateTime: boolean;
  audience: boolean;
  participants: boolean;
}

// ===== helpers =====
function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function isoToFields(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: "", time: "" };
  return {
    date: `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`,
    time: `${pad2(d.getHours())}:${pad2(d.getMinutes())}`,
  };
}

// BookingDto.format: "ONSITE" | "ONLINE" | "LABS" | "OTHER"
// Form wants: "offline" | "online" | "hybrid"
function dtoFormatToForm(v: BookingDto["format"]): BookingFormValues["format"] {
  switch (v) {
    case "ONSITE":
      return "offline";
    case "ONLINE":
      return "online";
    case "LABS":
      return "hybrid";
    case "OTHER":
      return "offline"; // fallback, т.к. в форме нет "other"
    default:
      return "offline";
  }
}

export default function BookingPage({ bookingId, onDone }: BookingPageProps) {
  const isEdit = Boolean(bookingId);

  const [auditoriums, setAuditoriums] = useState<AuditoriumDto[]>([]);
  const [loadingAud, setLoadingAud] = useState(true);
  const [audError, setAudError] = useState<string | null>(null);

  const [loadingBooking, setLoadingBooking] = useState(false);
  const [loadBookingError, setLoadBookingError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingAud(true);
        const data = await fetchAuditoriums();
        if (mounted) setAuditoriums(data);
      } catch (e) {
        if (mounted)
          setAudError((e as Error).message || "Ошибка загрузки аудиторий");
      } finally {
        if (mounted) setLoadingAud(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const [sectionStatus, setSectionStatus] = useState<SectionStatusState>({
    mainInfo: false,
    dateTime: false,
    audience: false,
    participants: false,
  });

  const handleSectionCompletionChange = (
    section: SectionKey,
    completed: boolean
  ) => {
    setSectionStatus((prev) =>
      prev[section] === completed ? prev : { ...prev, [section]: completed }
    );
  };

  const methods = useForm<BookingFormValues>({
    defaultValues: {
      title: "",
      eventType: "lecture",
      subject: "",
      format: "offline",
      description: "",

      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",

      mainAuditoriumId: "",
      reserveAuditoriumId: "",

      organizerName: "",
      organizerPosition: "",
      expectedCount: "",
      participantType: "",
      groupInput: "",
      groups: [],
    },
    mode: "onChange",
  });

  // ===== Load booking for edit =====
  useEffect(() => {
    if (!bookingId) return;

    let mounted = true;
    (async () => {
      try {
        setLoadBookingError(null);
        setLoadingBooking(true);

        const b = await fetchBooking(bookingId);

        const s = isoToFields(b.startsAt);
        const e = isoToFields(b.endsAt);

        if (!mounted) return;

        methods.reset({
          title: b.title ?? "",
          eventType:
            (b.eventType as BookingFormValues["eventType"]) ?? "lecture",
          subject: b.subject ?? "",
          format: dtoFormatToForm(b.format),
          description: b.description ?? "",

          startDate: s.date,
          startTime: s.time,
          endDate: e.date,
          endTime: e.time,

          mainAuditoriumId: b.mainAuditoriumId ?? "",
          reserveAuditoriumId: b.reserveAuditoriumId ?? "",

          organizerName: b.organizerName ?? "",
          organizerPosition: b.organizerPosition ?? "",
          expectedCount: b.expectedCount != null ? String(b.expectedCount) : "",
          participantType:
            (b.participantType as BookingFormValues["participantType"]) ?? "",
          groupInput: "",
          groups: b.groups ?? [],
        });
      } catch (e) {
        if (mounted)
          setLoadBookingError(
            (e as Error).message || "Ошибка загрузки бронирования"
          );
      } finally {
        if (mounted) setLoadingBooking(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [bookingId, methods]);

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSaving(true);

    try {
      // Мини-проверки (чтобы не отправлять совсем пустое)
      if (!values.title.trim()) throw new Error("Введите название мероприятия");
      if (!values.mainAuditoriumId)
        throw new Error("Выберите основную аудиторию");
      if (!values.organizerName.trim())
        throw new Error("Введите ФИО организатора");
      if (
        !values.startDate ||
        !values.startTime ||
        !values.endDate ||
        !values.endTime
      )
        throw new Error("Заполните дату и время");

      const startsAt = new Date(
        `${values.startDate}T${values.startTime}:00`
      ).toISOString();
      const endsAt = new Date(
        `${values.endDate}T${values.endTime}:00`
      ).toISOString();

      const body: BookingCreateBody = {
        title: values.title.trim(),
        eventType: values.eventType,

        subject: values.subject.trim() ? values.subject.trim() : null,
        description: values.description.trim()
          ? values.description.trim()
          : null,

        // маппинг формата
        format:
          values.format === "offline"
            ? "ONSITE"
            : values.format === "online"
            ? "ONLINE"
            : "HYBRID",

        startsAt,
        endsAt,

        mainAuditoriumId: values.mainAuditoriumId,
        reserveAuditoriumId: values.reserveAuditoriumId
          ? values.reserveAuditoriumId
          : null,

        organizerName: values.organizerName.trim(),
        organizerPosition: values.organizerPosition.trim()
          ? values.organizerPosition.trim()
          : null,

        expectedCount: values.expectedCount.trim()
          ? Number(values.expectedCount)
          : null,
        participantType: values.participantType ? values.participantType : null,

        groups: values.groups,
      };

      if (bookingId) {
        await updateBooking(bookingId, body);
      } else {
        await createBooking(body);
      }

      onDone();
      // если надо: methods.reset() при создании
    } catch (e) {
      setSubmitError((e as Error).message || "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  });

  const title = isEdit
    ? "Редактирование бронирования"
    : "Создание нового бронирования";
  const subtitle = isEdit
    ? "Измените данные и нажмите «Сохранить»"
    : "Заполните все необходимые данные для бронирования аудитории";

  const disabledAll = saving || loadingBooking;

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "#f9f9fb",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1350px",
          mx: "auto",
          px: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <PageHeader
          title={title}
          subtitle={subtitle}
          actions={
            <>
              <Button
                variant="text"
                startIcon={<SaveIcon />}
                size="small"
                disabled={disabledAll}
                onClick={onSubmit}
                sx={{
                  borderRadius: 2,
                  bgcolor: "rgba(238, 237, 237, 1)",
                  color: "rgba(75, 75, 75, 1)",
                  textTransform: "none",
                }}
              >
                Сохранить
              </Button>

              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                size="small"
                disabled={disabledAll}
                onClick={onDone}
                sx={{
                  borderRadius: 2,
                  bgcolor: "rgba(238, 237, 237, 1)",
                  color: "rgba(75, 75, 75, 1)",
                  textTransform: "none",
                }}
              >
                Назад к списку
              </Button>
            </>
          }
        />

        {submitError && (
          <Typography color="error" sx={{ px: 1 }}>
            {submitError}
          </Typography>
        )}

        {audError && (
          <Typography color="error" sx={{ px: 1 }}>
            {audError}
          </Typography>
        )}

        {loadBookingError && (
          <Typography color="error" sx={{ px: 1 }}>
            {loadBookingError}
          </Typography>
        )}

        {(loadingAud || loadingBooking) && (
          <Box sx={{ p: 3, display: "grid", placeItems: "center" }}>
            <CircularProgress />
          </Box>
        )}

        {!loadingBooking && !loadingAud && (
          <FormProvider {...methods}>
            <Stack direction="row" spacing={3} alignItems="flex-start">
              <Box
                sx={{
                  width: "70%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <MainInfoSection
                  onCompletionChange={(completed) =>
                    handleSectionCompletionChange("mainInfo", completed)
                  }
                />
                <DateTimeSection
                  onCompletionChange={(completed) =>
                    handleSectionCompletionChange("dateTime", completed)
                  }
                />
                <AudienceSelectionSection
                  onCompletionChange={(completed) =>
                    handleSectionCompletionChange("audience", completed)
                  }
                  auditoriums={auditoriums}
                />
                <ParticipantsSection
                  onCompletionChange={(completed) =>
                    handleSectionCompletionChange("participants", completed)
                  }
                />
              </Box>

              <Box
                sx={{
                  width: "30%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <BookingSummary />
                <BookingStatus
                  items={[
                    {
                      label: "Основная информация",
                      status: sectionStatus.mainInfo ? "success" : "error",
                    },
                    {
                      label: "Дата и время",
                      status: sectionStatus.dateTime ? "success" : "error",
                    },
                    {
                      label: "Выбор аудитории",
                      status: sectionStatus.audience ? "success" : "error",
                    },
                    {
                      label: "Организатор и участники",
                      status: sectionStatus.participants ? "success" : "error",
                    },
                  ]}
                />
                <BookingActions onCreate={onSubmit} isEdit={Boolean(bookingId)} isSubmitting={saving} />
              </Box>
            </Stack>
          </FormProvider>
        )}
      </Box>
    </Container>
  );
}

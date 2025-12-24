import { API_BASE } from "./apiBase";

// ===== types =====
export type BookingDto = {
  id: string;
  title: string;
  eventType: string;
  subject: string | null;
  format: "ONSITE" | "ONLINE" | "LABS" | "OTHER";
  description: string | null;

  startsAt: string;
  endsAt: string;

  mainAuditoriumId: string;
  mainAuditoriumName: string;

  reserveAuditoriumId: string | null;
  reserveAuditoriumName: string | null;

  organizerName: string;
  organizerPosition: string | null;

  expectedCount: number | null;
  participantType: string | null;

  groups: string[];
  createdAt: string;
};

export type BookingCreateBody = {
  title: string;
  eventType: string;
  subject?: string | null;
  format: "ONSITE" | "ONLINE" | "HYBRID";
  description?: string | null;

  startsAt: string;
  endsAt: string;

  mainAuditoriumId: string;
  reserveAuditoriumId?: string | null;

  organizerName: string;
  organizerPosition?: string | null;

  expectedCount?: number | null;
  participantType?: string | null;

  groups: string[];
};

// ===== helpers =====
async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

async function apiPost<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

async function apiPut<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

async function apiDelete(url: string): Promise<void> {
  const res = await fetch(url, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
}

// ===== API =====
export async function fetchBookings(): Promise<BookingDto[]> {
  return apiGet(`${API_BASE}/api/bookings`);
}

export async function fetchBooking(id: string): Promise<BookingDto> {
  return apiGet(`${API_BASE}/api/bookings/${id}`);
}

export async function createBooking(
  body: BookingCreateBody
): Promise<BookingDto> {
  return apiPost(`${API_BASE}/api/bookings`, body);
}

export async function updateBooking(
  id: string,
  body: BookingCreateBody
): Promise<BookingDto> {
  return apiPut(`${API_BASE}/api/bookings/${id}`, body);
}

export async function deleteBooking(id: string): Promise<void> {
  return apiDelete(`${API_BASE}/api/bookings/${id}`);
}

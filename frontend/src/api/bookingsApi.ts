// src/api/bookingsApi.ts
export type BookingDto = {
  id: string;
  title: string;
  eventType: string;
  subject: string | null;
  format: "ONSITE" | "ONLINE" | "LABS" | "OTHER";
  description: string | null;

  startsAt: string; // ISO
  endsAt: string; // ISO

  mainAuditoriumId: string;
  mainAuditoriumName: string;

  reserveAuditoriumId: string | null;
  reserveAuditoriumName: string | null;

  organizerName: string;
  organizerPosition: string | null;

  expectedCount: number | null;
  participantType: string | null;

  groups: string[];
  createdAt: string; // ISO
};

async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchBookings(): Promise<BookingDto[]> {
  return apiGet<BookingDto[]>("/api/bookings");
}

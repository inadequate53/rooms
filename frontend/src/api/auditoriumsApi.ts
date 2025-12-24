import { API_BASE } from "./apiBase";

export type AuditoriumDto = {
  id: string;
  name: string;
};

async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchAuditoriums(): Promise<AuditoriumDto[]> {
  return apiGet(`${API_BASE}/api/auditoriums`);
}

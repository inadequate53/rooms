export type AuditoriumStatus = "available" | "booked" | "maintenance";

export interface Auditorium {
  id: number;
  num: number;
  name: string;
  location: string;
  capacity: number;
  equipment: string;
  status: AuditoriumStatus;
}

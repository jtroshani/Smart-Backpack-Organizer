export type DayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

export const DAY_KEYS: DayKey[] = ["monday", "tuesday", "wednesday", "thursday", "friday"];

export const DAY_LABELS: Record<DayKey, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
};

export interface Material {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  materials: Material[];
}

export interface EverydayItem {
  id: string;
  name: string;
}

export type Schedule = Record<DayKey, string[]>;

export interface AppData {
  subjects: Subject[];
  schedule: Schedule;
  everydayItems: EverydayItem[];
}

export interface CheckedDayState {
  weekOf: string;
  items: Record<string, boolean>;
}

export type CheckedStore = Record<DayKey, CheckedDayState>;

import { DAY_KEYS, type DayKey } from "../types";

export function getTodayKey(): DayKey | null {
  const jsDay = new Date().getDay();
  const index = jsDay - 1;
  if (index < 0 || index > 4) return null;
  return DAY_KEYS[index];
}

export function getCurrentWeekMonday(): string {
  const now = new Date();
  const jsDay = now.getDay();
  const diff = jsDay === 0 ? -6 : 1 - jsDay;
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff);
  return monday.toISOString().slice(0, 10);
}

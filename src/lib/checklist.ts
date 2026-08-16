import type { AppData, CheckedDayState, DayKey } from "../types";

export interface ChecklistItem {
  key: string;
  name: string;
}

export interface ChecklistGroup {
  id: string;
  name: string;
  items: ChecklistItem[];
}

export function subjectItemKey(subjectId: string, materialId: string): string {
  return `subject:${subjectId}:${materialId}`;
}

export function everydayItemKey(itemId: string): string {
  return `everyday:${itemId}`;
}

export function buildDayGroups(day: DayKey, data: AppData): ChecklistGroup[] {
  const subjectIds = data.schedule[day] ?? [];
  const groups: ChecklistGroup[] = [];

  for (const subjectId of subjectIds) {
    const subject = data.subjects.find((s) => s.id === subjectId);
    if (!subject) continue;
    groups.push({
      id: subject.id,
      name: subject.name,
      items: subject.materials.map((m) => ({
        key: subjectItemKey(subject.id, m.id),
        name: m.name,
      })),
    });
  }

  if (data.everydayItems.length > 0) {
    groups.push({
      id: "everyday",
      name: "Everyday",
      items: data.everydayItems.map((item) => ({
        key: everydayItemKey(item.id),
        name: item.name,
      })),
    });
  }

  return groups;
}

export function countItems(groups: ChecklistGroup[]): number {
  return groups.reduce((sum, g) => sum + g.items.length, 0);
}

export function countChecked(groups: ChecklistGroup[], state: CheckedDayState | undefined): number {
  if (!state) return 0;
  let count = 0;
  for (const group of groups) {
    for (const item of group.items) {
      if (state.items[item.key]) count++;
    }
  }
  return count;
}

export function subjectSummary(day: DayKey, data: AppData): string {
  const subjectIds = data.schedule[day] ?? [];
  const names = subjectIds
    .map((id) => data.subjects.find((s) => s.id === id)?.name)
    .filter((n): n is string => Boolean(n));
  return names.join(" • ");
}

import { defaultData } from "./defaultData";
import { getCurrentWeekMonday } from "./dateUtils";
import { DAY_KEYS, type AppData, type CheckedStore } from "../types";

const DATA_KEY = "sbo:data";
const CHECKED_KEY = "sbo:checked";

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw) as AppData;
    if (!parsed.subjects || !parsed.schedule || !parsed.everydayItems) return defaultData;
    return parsed;
  } catch {
    return defaultData;
  }
}

export function saveData(data: AppData): void {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

function emptyCheckedStore(): CheckedStore {
  const weekOf = getCurrentWeekMonday();
  const store = {} as CheckedStore;
  for (const day of DAY_KEYS) {
    store[day] = { weekOf, items: {} };
  }
  return store;
}

export function loadChecked(): CheckedStore {
  const weekOf = getCurrentWeekMonday();
  try {
    const raw = localStorage.getItem(CHECKED_KEY);
    if (!raw) return emptyCheckedStore();
    const parsed = JSON.parse(raw) as CheckedStore;
    const store = {} as CheckedStore;
    for (const day of DAY_KEYS) {
      const dayState = parsed[day];
      if (dayState && dayState.weekOf === weekOf) {
        store[day] = dayState;
      } else {
        store[day] = { weekOf, items: {} };
      }
    }
    return store;
  } catch {
    return emptyCheckedStore();
  }
}

export function saveChecked(store: CheckedStore): void {
  localStorage.setItem(CHECKED_KEY, JSON.stringify(store));
}

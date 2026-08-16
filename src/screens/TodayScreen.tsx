import { DayAccordion } from "../components/DayAccordion";
import { Header } from "../components/Header";
import { DAY_KEYS, type AppData, type CheckedStore, type DayKey } from "../types";

interface TodayScreenProps {
  data: AppData;
  checked: CheckedStore;
  openDay: DayKey | null;
  todayKey: DayKey | null;
  onToggleOpen: (day: DayKey) => void;
  onToggleItem: (day: DayKey, itemKey: string) => void;
}

export function TodayScreen({
  data,
  checked,
  openDay,
  todayKey,
  onToggleOpen,
  onToggleItem,
}: TodayScreenProps) {
  return (
    <>
      <Header
        title="Smart Backpack Organizer"
        subtitle="Select a day to see everything your child needs for school and check items off as you pack."
      />
      <main className="app-main">
        <div className="accordion-list">
          {DAY_KEYS.map((day) => (
            <DayAccordion
              key={day}
              day={day}
              data={data}
              isOpen={openDay === day}
              isToday={todayKey === day}
              checkedState={checked[day]}
              onToggleOpen={() => onToggleOpen(day)}
              onToggleItem={(itemKey) => onToggleItem(day, itemKey)}
            />
          ))}
        </div>
      </main>
    </>
  );
}

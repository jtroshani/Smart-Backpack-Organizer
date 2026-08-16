import { useState } from "react";
import { Header } from "../components/Header";
import { Check } from "lucide-react";
import { DAY_KEYS, DAY_LABELS, type AppData, type DayKey } from "../types";

interface ScheduleScreenProps {
  data: AppData;
  onToggleSubjectForDay: (day: DayKey, subjectId: string) => void;
}

export function ScheduleScreen({ data, onToggleSubjectForDay }: ScheduleScreenProps) {
  const [activeDay, setActiveDay] = useState<DayKey>("monday");
  const assignedIds = new Set(data.schedule[activeDay] ?? []);

  return (
    <>
      <Header title="Schedule" subtitle="Choose which subjects your child has on each day." />
      <main className="app-main">
        <div className="day-tabs">
          {DAY_KEYS.map((day) => (
            <button
              key={day}
              type="button"
              className={`day-tab${activeDay === day ? " active" : ""}`}
              onClick={() => setActiveDay(day)}
            >
              {DAY_LABELS[day].slice(0, 3)}
            </button>
          ))}
        </div>

        <div className="card manage-card">
          {data.subjects.length === 0 ? (
            <p style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>
              No subjects yet. Add some in the Subjects tab first.
            </p>
          ) : (
            data.subjects.map((subject) => {
              const checked = assignedIds.has(subject.id);
              return (
                <div
                  key={subject.id}
                  className="manage-row manage-row--toggle"
                  onClick={() => onToggleSubjectForDay(activeDay, subject.id)}
                >
                  <span className={`toggle-check${checked ? " checked" : ""}`}>
                    {checked && <Check size={14} strokeWidth={3} color="#fff" />}
                  </span>
                  <span className="manage-row__label">{subject.name}</span>
                </div>
              );
            })
          )}
        </div>
      </main>
    </>
  );
}

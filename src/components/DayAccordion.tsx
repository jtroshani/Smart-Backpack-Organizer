import { Check, ChevronDown, PartyPopper } from "lucide-react";
import { buildDayGroups, countChecked, countItems, subjectSummary } from "../lib/checklist";
import { ProgressRing } from "./ProgressRing";
import { DAY_LABELS, type AppData, type CheckedDayState, type DayKey } from "../types";

interface DayAccordionProps {
  day: DayKey;
  data: AppData;
  isOpen: boolean;
  isToday: boolean;
  checkedState: CheckedDayState;
  onToggleOpen: () => void;
  onToggleItem: (key: string) => void;
}

export function DayAccordion({
  day,
  data,
  isOpen,
  isToday,
  checkedState,
  onToggleOpen,
  onToggleItem,
}: DayAccordionProps) {
  const groups = buildDayGroups(day, data);
  const total = countItems(groups);
  const packed = countChecked(groups, checkedState);
  const summary = subjectSummary(day, data);
  const complete = total > 0 && packed === total;

  return (
    <div className="card day-card">
      <button
        type="button"
        className="day-card__header"
        onClick={onToggleOpen}
        aria-expanded={isOpen}
      >
        <ProgressRing packed={packed} total={total} />
        <div className="day-card__body">
          <div className="day-card__name-row">
            <p className="day-card__name">{DAY_LABELS[day]}</p>
            {isToday && <span className="day-card__today-pill">Today</span>}
          </div>
          <p className="day-card__summary">
            {summary || "No subjects scheduled"}
          </p>
        </div>
        <div className="day-card__meta">
          <span className="day-card__count">{total} items</span>
        </div>
        <ChevronDown size={20} className={`day-card__chevron${isOpen ? " open" : ""}`} />
      </button>

      <div className={`day-card__panel${isOpen ? " open" : ""}`}>
        <div className="day-card__panel-inner">
          <div className="day-card__content">
            {groups.length === 0 ? (
              <p style={{ color: "var(--color-text-secondary)", fontSize: 14, margin: "8px 0" }}>
                Nothing scheduled for this day yet. Add subjects in Schedule.
              </p>
            ) : (
              groups.map((group) => (
                <div className="checklist-group" key={group.id}>
                  <p className="checklist-group__title">{group.name}</p>
                  {group.items.map((item) => {
                    const checked = Boolean(checkedState.items[item.key]);
                    return (
                      <button
                        type="button"
                        key={item.key}
                        className="checklist-item"
                        onClick={() => onToggleItem(item.key)}
                        aria-pressed={checked}
                      >
                        <span className={`checkbox${checked ? " checked" : ""}`}>
                          {checked && <Check size={15} strokeWidth={3} color="#fff" />}
                        </span>
                        <span className={`checklist-item__label${checked ? " checked" : ""}`}>
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))
            )}

            {total > 0 && (
              <div className="day-card__footer">
                {complete ? (
                  <div className="ready-banner">
                    <PartyPopper size={18} />
                    Backpack Ready
                  </div>
                ) : (
                  <div className="progress-row">
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${total === 0 ? 0 : (packed / total) * 100}%` }}
                      />
                    </div>
                    <span className="progress-label">
                      {packed} of {total} packed
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

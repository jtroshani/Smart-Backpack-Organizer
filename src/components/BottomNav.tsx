import { Backpack, BookOpen, CalendarDays, Settings } from "lucide-react";
import type { ScreenKey } from "../App";

interface BottomNavProps {
  active: ScreenKey;
  onChange: (screen: ScreenKey) => void;
}

const NAV_ITEMS: { key: ScreenKey; label: string; icon: typeof Backpack }[] = [
  { key: "today", label: "Today", icon: Backpack },
  { key: "schedule", label: "Schedule", icon: CalendarDays },
  { key: "subjects", label: "Subjects", icon: BookOpen },
  { key: "settings", label: "Settings", icon: Settings },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          className={`bottom-nav__item${active === key ? " active" : ""}`}
          onClick={() => onChange(key)}
          aria-current={active === key ? "page" : undefined}
        >
          <Icon size={22} strokeWidth={2.2} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

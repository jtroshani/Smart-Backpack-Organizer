import { useEffect, useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { TodayScreen } from "./screens/TodayScreen";
import { ScheduleScreen } from "./screens/ScheduleScreen";
import { SubjectsScreen } from "./screens/SubjectsScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { getCurrentWeekMonday, getTodayKey } from "./lib/dateUtils";
import { createId } from "./lib/id";
import { defaultData } from "./lib/defaultData";
import { loadChecked, loadData, saveChecked, saveData } from "./lib/storage";
import type { AppData, CheckedStore, DayKey } from "./types";

export type ScreenKey = "today" | "schedule" | "subjects" | "settings";

const todayKey = getTodayKey();

export default function App() {
  const [screen, setScreen] = useState<ScreenKey>("today");
  const [data, setData] = useState<AppData>(() => loadData());
  const [checked, setChecked] = useState<CheckedStore>(() => loadChecked());
  const [openDay, setOpenDay] = useState<DayKey | null>(todayKey ?? "monday");

  useEffect(() => saveData(data), [data]);
  useEffect(() => saveChecked(checked), [checked]);

  const handleToggleOpenDay = (day: DayKey) => {
    setOpenDay((prev) => (prev === day ? null : day));
  };

  const handleToggleItem = (day: DayKey, itemKey: string) => {
    setChecked((prev) => {
      const dayState = prev[day];
      const nextChecked = !dayState.items[itemKey];
      return {
        ...prev,
        [day]: {
          weekOf: getCurrentWeekMonday(),
          items: { ...dayState.items, [itemKey]: nextChecked },
        },
      };
    });
  };

  const handleToggleSubjectForDay = (day: DayKey, subjectId: string) => {
    setData((prev) => {
      const current = prev.schedule[day] ?? [];
      const nextIds = current.includes(subjectId)
        ? current.filter((id) => id !== subjectId)
        : [...current, subjectId];
      return { ...prev, schedule: { ...prev.schedule, [day]: nextIds } };
    });
  };

  const handleAddSubject = (name: string) => {
    setData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { id: createId(), name, materials: [] }],
    }));
  };

  const handleRenameSubject = (subjectId: string, name: string) => {
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s) => (s.id === subjectId ? { ...s, name } : s)),
    }));
  };

  const handleDeleteSubject = (subjectId: string) => {
    setData((prev) => {
      const nextSchedule = { ...prev.schedule };
      for (const day of Object.keys(nextSchedule) as DayKey[]) {
        nextSchedule[day] = nextSchedule[day].filter((id) => id !== subjectId);
      }
      return {
        ...prev,
        subjects: prev.subjects.filter((s) => s.id !== subjectId),
        schedule: nextSchedule,
      };
    });
  };

  const handleAddMaterial = (subjectId: string, name: string) => {
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s) =>
        s.id === subjectId ? { ...s, materials: [...s.materials, { id: createId(), name }] } : s
      ),
    }));
  };

  const handleDeleteMaterial = (subjectId: string, materialId: string) => {
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s) =>
        s.id === subjectId
          ? { ...s, materials: s.materials.filter((m) => m.id !== materialId) }
          : s
      ),
    }));
  };

  const handleAddEverydayItem = (name: string) => {
    setData((prev) => ({
      ...prev,
      everydayItems: [...prev.everydayItems, { id: createId(), name }],
    }));
  };

  const handleDeleteEverydayItem = (itemId: string) => {
    setData((prev) => ({
      ...prev,
      everydayItems: prev.everydayItems.filter((i) => i.id !== itemId),
    }));
  };

  const handleResetData = () => {
    setData(defaultData);
  };

  return (
    <div className="app">
      {screen === "today" && (
        <TodayScreen
          data={data}
          checked={checked}
          openDay={openDay}
          todayKey={todayKey}
          onToggleOpen={handleToggleOpenDay}
          onToggleItem={handleToggleItem}
        />
      )}
      {screen === "schedule" && (
        <ScheduleScreen data={data} onToggleSubjectForDay={handleToggleSubjectForDay} />
      )}
      {screen === "subjects" && (
        <SubjectsScreen
          data={data}
          onAddSubject={handleAddSubject}
          onRenameSubject={handleRenameSubject}
          onDeleteSubject={handleDeleteSubject}
          onAddMaterial={handleAddMaterial}
          onDeleteMaterial={handleDeleteMaterial}
        />
      )}
      {screen === "settings" && (
        <SettingsScreen
          data={data}
          onAddEverydayItem={handleAddEverydayItem}
          onDeleteEverydayItem={handleDeleteEverydayItem}
          onResetData={handleResetData}
        />
      )}
      <BottomNav active={screen} onChange={setScreen} />
    </div>
  );
}

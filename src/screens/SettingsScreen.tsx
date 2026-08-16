import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Header } from "../components/Header";
import type { AppData } from "../types";

interface SettingsScreenProps {
  data: AppData;
  onAddEverydayItem: (name: string) => void;
  onDeleteEverydayItem: (itemId: string) => void;
  onResetData: () => void;
}

export function SettingsScreen({
  data,
  onAddEverydayItem,
  onDeleteEverydayItem,
  onResetData,
}: SettingsScreenProps) {
  const [draft, setDraft] = useState("");

  const handleAdd = () => {
    const name = draft.trim();
    if (!name) return;
    onAddEverydayItem(name);
    setDraft("");
  };

  return (
    <>
      <Header title="Settings" subtitle="Everyday items go in the backpack no matter the day." />
      <main className="app-main">
        <p className="section-title">Everyday items</p>
        <div className="card manage-card">
          {data.everydayItems.length === 0 ? (
            <p style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>
              No everyday items yet.
            </p>
          ) : (
            data.everydayItems.map((item) => (
              <div key={item.id} className="item-row">
                <span className="item-row__label">{item.name}</span>
                <button
                  type="button"
                  className="icon-btn icon-btn-danger"
                  onClick={() => onDeleteEverydayItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
          <div className="inline-add">
            <input
              className="text-input"
              placeholder="e.g. Umbrella"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
              }}
            />
            <button type="button" className="icon-btn" onClick={handleAdd} aria-label="Add item">
              <Plus size={18} />
            </button>
          </div>
        </div>

        <p className="section-title">Data</p>
        <div className="card manage-card">
          <button
            type="button"
            className="btn btn-danger-ghost"
            onClick={() => {
              if (confirm("Reset subjects, schedule, and everyday items back to the defaults? This can't be undone.")) {
                onResetData();
              }
            }}
          >
            Reset to default setup
          </button>
        </div>

        <p className="settings-footer">
          Smart Backpack Organizer
          <br />
          Everything is saved on this device only.
        </p>
      </main>
    </>
  );
}

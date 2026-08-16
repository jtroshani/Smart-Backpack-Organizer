import { useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { Header } from "../components/Header";
import type { AppData } from "../types";

interface SubjectsScreenProps {
  data: AppData;
  onAddSubject: (name: string) => void;
  onRenameSubject: (subjectId: string, name: string) => void;
  onDeleteSubject: (subjectId: string) => void;
  onAddMaterial: (subjectId: string, name: string) => void;
  onDeleteMaterial: (subjectId: string, materialId: string) => void;
}

export function SubjectsScreen({
  data,
  onAddSubject,
  onRenameSubject,
  onDeleteSubject,
  onAddMaterial,
  onDeleteMaterial,
}: SubjectsScreenProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newMaterialDrafts, setNewMaterialDrafts] = useState<Record<string, string>>({});

  const handleAddSubject = () => {
    const name = newSubjectName.trim();
    if (!name) return;
    onAddSubject(name);
    setNewSubjectName("");
  };

  const handleAddMaterial = (subjectId: string) => {
    const name = (newMaterialDrafts[subjectId] ?? "").trim();
    if (!name) return;
    onAddMaterial(subjectId, name);
    setNewMaterialDrafts((prev) => ({ ...prev, [subjectId]: "" }));
  };

  return (
    <>
      <Header title="Subjects" subtitle="Manage subjects and the materials each one needs." />
      <main className="app-main">
        {data.subjects.length === 0 && (
          <p style={{ color: "var(--color-text-secondary)", fontSize: 14, marginBottom: 12 }}>
            No subjects yet. Add your first one below.
          </p>
        )}

        {data.subjects.map((subject) => {
          const isOpen = expandedId === subject.id;
          return (
            <div key={subject.id} className="card manage-card">
              <div className="manage-card__header">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setExpandedId(isOpen ? null : subject.id)}
                  aria-label={isOpen ? "Collapse" : "Expand"}
                >
                  <ChevronDown
                    size={18}
                    style={{ transition: "transform 0.2s ease", transform: isOpen ? "rotate(180deg)" : "none" }}
                  />
                </button>
                <input
                  className="manage-card__title-input"
                  value={subject.name}
                  onChange={(e) => onRenameSubject(subject.id, e.target.value)}
                  aria-label="Subject name"
                />
                <button
                  type="button"
                  className="icon-btn icon-btn-danger"
                  onClick={() => {
                    if (confirm(`Delete "${subject.name}" and all its materials?`)) {
                      onDeleteSubject(subject.id);
                    }
                  }}
                  aria-label="Delete subject"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="manage-card__caption">
                {subject.materials.length} {subject.materials.length === 1 ? "item" : "items"}
              </p>

              {isOpen && (
                <div style={{ marginTop: 10 }}>
                  {subject.materials.map((material) => (
                    <div key={material.id} className="item-row">
                      <span className="item-row__label">{material.name}</span>
                      <button
                        type="button"
                        className="icon-btn icon-btn-danger"
                        onClick={() => onDeleteMaterial(subject.id, material.id)}
                        aria-label={`Remove ${material.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <div className="inline-add">
                    <input
                      className="text-input"
                      placeholder="Add material…"
                      value={newMaterialDrafts[subject.id] ?? ""}
                      onChange={(e) =>
                        setNewMaterialDrafts((prev) => ({ ...prev, [subject.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddMaterial(subject.id);
                      }}
                    />
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => handleAddMaterial(subject.id)}
                      aria-label="Add material"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="card manage-card">
          <p className="section-title" style={{ margin: "0 0 10px" }}>
            Add subject
          </p>
          <div className="inline-add">
            <input
              className="text-input"
              placeholder="e.g. Chemistry"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddSubject();
              }}
            />
            <button type="button" className="icon-btn" onClick={handleAddSubject} aria-label="Add subject">
              <Plus size={18} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

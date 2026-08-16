import type { AppData } from "../types";

function s(id: string, name: string) {
  return { id, name };
}

export const defaultData: AppData = {
  subjects: [
    {
      id: "math",
      name: "Math",
      materials: [
        s("math-book", "Math textbook"),
        s("math-notebook", "Notebook"),
        s("math-geo-set", "Geometry set"),
        s("math-compass", "Compass"),
      ],
    },
    {
      id: "italian",
      name: "Italian",
      materials: [
        s("it-book", "Italian textbook"),
        s("it-notebook", "Notebook"),
        s("it-folder", "Folder"),
      ],
    },
    {
      id: "geography",
      name: "Geography",
      materials: [s("geo-book", "Geography textbook"), s("geo-atlas", "Atlas")],
    },
    {
      id: "english",
      name: "English",
      materials: [
        s("eng-book", "English textbook"),
        s("eng-notebook", "Notebook"),
        s("eng-workbook", "Workbook"),
      ],
    },
    {
      id: "science",
      name: "Science",
      materials: [s("sci-book", "Science textbook"), s("sci-notebook", "Notebook")],
    },
    {
      id: "history",
      name: "History",
      materials: [s("hist-book", "History textbook"), s("hist-notebook", "Notebook")],
    },
    {
      id: "art",
      name: "Art",
      materials: [s("art-sketchbook", "Sketchbook"), s("art-pencils", "Colored pencils")],
    },
    {
      id: "pe",
      name: "Physical Education",
      materials: [s("pe-kit", "PE kit"), s("pe-shoes", "Sneakers")],
    },
    {
      id: "music",
      name: "Music",
      materials: [s("music-book", "Music book"), s("music-recorder", "Recorder")],
    },
  ],
  schedule: {
    monday: ["math", "italian", "geography"],
    tuesday: ["english", "science", "art"],
    wednesday: ["math", "history", "music"],
    thursday: ["italian", "pe", "science"],
    friday: ["math", "english", "geography"],
  },
  everydayItems: [
    s("pencil-case", "Pencil case"),
    s("water-bottle", "Water bottle"),
    s("lunch-box", "Lunch box"),
    s("diary", "School diary"),
    s("snack", "Snack"),
  ],
};

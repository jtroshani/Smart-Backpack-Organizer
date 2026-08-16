# Smart Backpack Organizer

A mobile-first web app that helps parents know exactly what their child needs
to pack for school each day.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to `http://localhost:5173`).

## How it works

- **Today** — Monday through Friday as single-open accordions. Each day's
  checklist is generated from the subjects scheduled that day, plus your
  everyday items (pencil case, water bottle, etc).
- **Schedule** — assign subjects to each weekday.
- **Subjects** — manage subjects and the materials each one needs.
- **Settings** — manage everyday items and reset to the default setup.

All data (subjects, schedule, everyday items, and checked-off items) is saved
to the browser's local storage, so it persists between visits on the same
device. Checked items automatically reset at the start of each new week.

## Build

```bash
npm run build
```

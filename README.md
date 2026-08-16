# Smart Backpack Organizer

A mobile-first web app that helps parents know exactly what their child needs
to pack for school each day.

The entire app — markup, styles, and logic — lives in a single file,
[index.html](index.html). No build step, no npm install, no external
dependencies or network requests. Open the file directly in a browser, or
serve it statically, and it works.

## Getting started

Double-click `index.html`, or serve it:

```bash
python3 -m http.server 8000
```

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

## Language

The interface is fully bilingual (English/Italian). A toggle in the top-right
of the header switches instantly and the choice is remembered on the device.
The starter demo content (the default subjects and materials) switches
language along with it — but only until you actually customize something
(rename a subject, add a material, etc.); after that, your own text is never
auto-translated or overwritten.

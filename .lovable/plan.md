# Clickable progress + Down-arrow exit in Game Mode

## 1. Make the "% explored" chip clickable

The chip in the world HUD becomes a button that opens a small "Exploration checklist" panel anchored just below it.

Panel contents:
- Two groups: **Sections** (8) and **Case studies** (4) — because the horizontal trail bar only tracks the 8 street sections, while the % counts all 12 locations. This is exactly the mismatch the user noticed, so the panel is where the missing case studies become visible.
- Each item shows a check icon when visited, a dim circle when not.
- Unvisited items are clickable: a section walks the character to that building and opens it; a case study opens the Projects hall door for that study directly.
- Header line: "8 of 12 explored", plus a "Missing: N" hint.
- Closes on outside click, Esc, or the chip being clicked again.

## 2. Down-arrow to exit a section

Currently entering uses ↑ / Enter / touch "Enter", but leaving an open section only works via Esc or the close button.

- Add a global ArrowDown handler while a section overlay is open, calling the same close handler as the header button (respects the nested stack: case study -> projects hall -> street).
- Add a persistent floating "Exit ↓" button at the bottom-center of the overlay so touch users get the same affordance.
- Update the HUD hint text to: "← → to walk · ↑ to enter · ↓ / Esc to leave".

## Technical notes

- `ExplorerWorld.tsx`: new local state for the checklist popover; reuse existing `visitedSections` / `visitedCaseStudies` / `progress` from `ExplorerContext`; reuse `SECTION_ICONS` / `CASE_STUDY_ICONS`. Walking to a section reuses the trail-dot logic (`xRef.current = s.x; setX(s.x)`), then triggers enter.
- `SectionOverlay.tsx`: extend the existing keydown listener to also handle `ArrowDown`, and render the bottom "Exit ↓" button that calls `onClose`.
- No context/data-model changes; presentation only.

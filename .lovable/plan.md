# Consolidate exploration UI in Game Mode

## 1. Remove the horizontal trail bar

The floating trail bar under the HUD duplicates the checklist popover (both are "where have I been / take me there"), and it only tracks 8 of the 12 locations. It gets deleted from the world view. Its one unique behavior — click a dot to walk to that building — already exists in the checklist rows, so nothing is lost.

## 2. Redesign the checklist as a bottom dock instead of a floating popover

Instead of a card that drops down over the buildings, the checklist slides up from the bottom edge as a full-width dock that sits above the sidewalk strip.

- Trigger stays the "% explored" chip in the top-left; it toggles the dock.
- The dock is anchored to the bottom, above the ground line, so it never covers the character or building facades at eye level.
- Layout is horizontal to match the world's side-scrolling feel: a single row of 12 compact chips (8 sections, then 4 case studies, separated by a thin divider and small group labels), horizontally scrollable on narrow screens.
- Each chip: icon, label, and a check mark when visited; unvisited chips read as bright/actionable, visited ones dim.
- Clicking a section chip walks the character there and opens it; a case study chip opens that study directly.
- Left side of the dock shows "N of 12 explored" and a slim progress line, so the % chip and the dock always agree.
- Closes on the chip, Esc, or clicking a chip. Slides in/out with a short translate-y animation, disabled under reduced motion.
- On mobile the dock sits above the touch controls so the walk/enter buttons stay reachable.

## Technical notes

- `ExplorerWorld.tsx`: delete the trail-bar block (the `top-16` card with the dot buttons) and re-render the existing `checklistOpen` state as a bottom-docked bar (`absolute bottom-24 inset-x-0 z-40`, `md:bottom-24`, extra offset on mobile for the touch row). Keep `goToSection` and `openCaseStudyById` as-is and wire them to the chips.
- Keep the existing outside-click catcher and add an Esc handler for the dock.
- All colors via existing semantic tokens (`bg-card/90`, `border-border`, `text-primary`, `text-muted-foreground`); presentation-only change, no context/data-model edits.

# Site Explorer: Character That Walks With Scroll

## Goal

Replace the checklist-feeling journey map with a visible character that physically moves along a trail as the visitor scrolls, so exploration is felt rather than read.

## What changes

### 1. Always-visible trail rail (game mode on)

- A slim vertical trail pinned to the left edge of the viewport, full height.
- Each of the 8 main sections is a station dot placed at its true position on the trail (proportional to that section's position in the page).
- The trail behind the character fills in as they progress; the path ahead stays faint/dotted.

### 2. The bobblehead walks the trail

- The profile-picture bobblehead sits on the trail and its vertical position is driven directly by scroll position, updating every frame (rAF-throttled scroll listener).
- Continuous motion, not snapping: scroll down a little, the character slides down a little.
- Walk feel: subtle bob up/down and a slight lean in the direction of travel while scrolling; idle breathing/settle animation when scrolling stops.
- On reaching a station dot, the character does a short hop and the dot pops + lights up, with the section name flashing beside it briefly.

### 3. Section-to-section travel on jumps

- When someone clicks a nav link or a map station, the character animates along the trail to that station (spring easing) rather than teleporting.

### 4. Case studies as side trips

- Navigating to a case study slides the character off the main trail into a small "side trip" marker at the top of the rail, then returns it to the trail when coming back to the home page.
- Case-study completion still counts toward the total.

### 5. Progress readout

- The percentage stays, but shown compactly at the bottom of the rail rather than as a card.
- Journey map panel stays available on click for jumping around, but the checklist styling is softened (no strikethrough list feel) — the primary experience is the moving character.
- Completion celebration keeps the trophy badge plus a confetti-free burst animation on the character.

### 6. Mobile

- Trail collapses to a thin rail on the far left with a smaller character; map opens as a bottom sheet.

## Technical approach

- New `useScrollJourney` hook: measures each section's `offsetTop`/height once on mount and on resize, maps `window.scrollY` to a 0–1 journey value plus the nearest station index.
- Character position via CSS `transform: translateY()` with a spring transition; scroll updates via `requestAnimationFrame` for smoothness.
- `prefers-reduced-motion` disables bobbing/lean and uses instant positioning.
- Reuse existing `ExplorerContext` for visited state, game-mode toggle, and progress; add station offsets to it or keep them local to the new hook.
- New: `src/components/ExplorerTrail.tsx` (rail + stations + character). Modify `SiteExplorer.tsx` to render the trail instead of the corner bubble, `JourneyMap.tsx` for softened styling, `tailwind.config.ts` for walk/lean/hop keyframes.

## Out of scope

- No persistence, no backend, no new pages.
- No physics engine or sprite animation — CSS transforms only.

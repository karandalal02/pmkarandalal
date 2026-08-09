# Enter project case studies inside Explorer World

Right now the four project "shops" on the street don't open in the world: entering one exits Explorer World and navigates to the normal case-study route. And clicking a project card inside the Projects building overlay triggers a route change while the world overlay is still on screen, so nothing useful appears.

## What changes

1. **Project shops open in-world.** Walking up to a project building (Goldies Grand Match, Shockwave, AI Job Search System, TV Time 2.0) and pressing Enter plays the door animation and opens that full case study in the same full-screen overlay used for sections — no exit from the world, no route change. "Back to street" returns you to the sidewalk.
2. **Project cards inside the Projects building work too.** Clicking a case-study card in the Projects overlay opens that case study as a nested overlay in the world instead of navigating away.
3. **Clearer shop signage.** Project buildings get a distinct look/label treatment so it reads as "these are enterable projects", plus the same visited checkmark behaviour.
4. Visited tracking stays as-is: entering a project marks it visited and counts toward the completion percentage.

## Technical notes

- Extract each case-study page body into a reusable content component (or render the existing page components inside the overlay without their own `Navigation`/`Footer` chrome) so `SectionOverlay` can display them.
- `ExplorerWorld`: replace the `navigate(spot.path)` branch for `caseStudyId` spots with `setActiveSpot(spot)`; map `caseStudyId -> content component` alongside the existing `sectionContent` map.
- Wrap the overlay content in a context/handler that intercepts `react-router` `Link` clicks to `/goldies-grand-match`, `/shockwave`, `/ai-job-search-system`, `/tv-time-2-0`, calling `visitCaseStudy` + swapping the overlay instead of navigating.
- Overlay header shows the case-study name and keeps Esc / "Back to street".

## Out of scope

- Changing the normal (non-game) routes or their content.

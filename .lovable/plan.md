# Explorer World: a walkable 2.5D portfolio street

Game Mode gains a second, richer experience: instead of only a scroll trail, visitors can enter a side-scrolling street where a stick-figure version of you (with your photo as a bobblehead) walks left and right past buildings — one per portfolio section — and opens a door to read that section.

## The experience

1. Game Mode is on -> a "Enter Explorer World" button appears (nav + on the trail avatar).
2. The world takes over the screen: a parallax street with sky, distant skyline, buildings, and a sidewalk.
3. Arrow keys / A-D move the character; on touch, on-screen left/right buttons. Camera pans to follow.
4. Each building is a section: Home, About, Experience, Projects, Education, Skills, Mentorship, Contact, plus four smaller "side trip" shops for the case studies.
5. Standing in front of a door shows a prompt ("Enter" / press Up or E). Activating it plays a door swing-open animation, the screen wipes, and the real section content appears in a full-screen overlay panel.
6. Closing the overlay plays the door swing-shut animation and returns the character to the street.
7. Entering a building marks that location visited — same progress state as today, so the trail, map and 100% completion badge all stay in sync.
8. Esc or an "Exit world" button returns to the normal scrolling site; the scroll trail is untouched and still works.

## Look and feel

- Flat, minimal, tech-style illustration matching the site: light sky, muted building blocks, dark outlines, accent color on doors and signage. No photoreal 3D, no heavy textures.
- Buildings are CSS/SVG shapes with a signboard carrying the section name and a visited checkmark.
- Character: thin stick-figure body with swinging arms/legs while walking, topped by the circular profile photo that bobs and tilts with movement, plus a soft ground shadow.
- Parallax: three depth layers scrolling at different speeds to sell the 2.5D feel.
- Respects `prefers-reduced-motion`: movement becomes instant, bob/parallax disabled.

## Technical notes

- No 3D library. Pure React + CSS transforms + `requestAnimationFrame`, so bundle size and mobile perf stay fine.
- New files:
  - `src/components/world/ExplorerWorld.tsx` — fullscreen overlay, game loop, keyboard/touch input, camera offset.
  - `src/components/world/WorldCharacter.tsx` — stick figure + photo bobblehead, walk/idle states.
  - `src/components/world/WorldBuilding.tsx` — building shape, signboard, door with open/close animation, proximity prompt.
  - `src/components/world/SectionOverlay.tsx` — full-screen panel that renders the section's existing component.
  - `src/hooks/useWorldControls.ts` — key + touch input state.
- `ExplorerContext` gains `worldOpen` / `openWorld` / `closeWorld`; visited tracking reuses the existing `visitSection` / `visitCaseStudy`.
- Building layout derives from the existing `SECTIONS` and `CASE_STUDIES` arrays so nothing gets out of sync.
- Section overlays reuse `About`, `Experience`, `Projects`, etc. directly — no content duplication. Case-study shops link to their existing routes.
- New keyframes for door swing, walk cycle and screen wipe go in `tailwind.config.ts`; all colors use existing semantic tokens.
- `SiteExplorer.tsx` renders `ExplorerWorld` alongside the trail and map; scroll locking while the world is open.

## Out of scope

- Real 3D / WebGL, collectibles, NPCs, sound, saved progress across visits.

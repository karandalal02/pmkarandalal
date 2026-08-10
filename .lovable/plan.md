# Time-of-day atmosphere for the portfolio

Make the site feel alive by changing the sky and palette based on the visitor's local clock — dawn, day, sunset, night — in both Explorer World and the normal pages, with a manual override.

## Phases of the day

| Phase | Local time | Sky | Sky props | Page palette |
|---|---|---|---|---|
| Dawn | 05:00–08:00 | soft peach to pale blue | rising sun low, thin clouds, birds | light, warm-tinted |
| Day | 08:00–17:00 | bright blue | high sun, drifting clouds, birds | light (current look) |
| Sunset | 17:00–20:00 | orange to violet | low sun, warm clouds, birds | warm dusk, medium contrast |
| Night | 20:00–05:00 | deep navy | moon, twinkling stars, occasional shooting star | dark palette |

## Explorer World sky

- Replace the flat sky gradient with a phase-driven gradient plus a parallax sky layer that fills the currently empty upper area.
- Sun/moon: a soft glowing disc whose vertical position and colour follow the phase; it parallaxes very slowly so it feels far away.
- Clouds: a few soft rounded shapes drifting slowly right-to-left at two depths, tinted per phase.
- Stars: only at night — scattered dots with staggered twinkle; a rare shooting star.
- Birds: small animated "v" shapes gliding across the sky during dawn/day/sunset.
- Buildings/skyline dim and their windows light up warm at night; the sidewalk and street tint accordingly.
- All motion is disabled when the visitor prefers reduced motion.

## Normal pages

- Full theming: dawn and day use the existing light palette (dawn slightly warmer), sunset uses a warm dusk palette, night switches to the dark palette so it matches the world.
- Achieved by adding a phase class on the document root (`.tod-dawn`, `.tod-day`, `.tod-sunset`, `.tod-night`) that overrides the existing HSL design tokens in `index.css`. Components keep using semantic tokens, so no per-component colour edits.
- The hero gets a subtle sky wash matching the phase so the top of the page never feels flat.
- Transitions between phases are smooth, not abrupt.

## Manual override

- A small sun/moon control in the navigation (and mirrored in the Explorer World HUD) cycles Auto → Dawn → Day → Sunset → Night → Auto.
- Choice persists in local storage; Auto re-evaluates on load and every few minutes.

## Technical notes

- New `TimeOfDayContext` provides `phase`, `source` (auto/manual) and `cyclePhase()`; it applies the phase class to `document.documentElement`.
- New `src/components/world/SkyLayer.tsx` renders sun/moon, clouds, stars and birds, driven by phase and camera offset for parallax; keyframes added to `tailwind.config.ts` (drift, twinkle, glide).
- `index.css` gains token overrides per phase, reusing the existing `.dark` values for night to guarantee contrast.
- `ExplorerWorld.tsx` swaps its hardcoded sky/parallax classes for phase-aware tokens and mounts `SkyLayer`.
- Section overlays inherit the page tokens, so case studies stay consistent inside the world.

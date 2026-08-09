# Gamify the Portfolio: Site Explorer

## Goal
Turn the portfolio into a playful, explorable journey where visitors are guided through every section by a small bobblehead explorer. Progress is tracked per visit and reset on reload, with animated transitions as the explorer moves between "locations" on the page.

## What we'll build

### 1. Explorer character
- Add a small floating avatar (Karan's profile picture styled as a bobblehead) that follows the visitor's scroll progress through the page.
- It sits in a fixed corner on desktop and collapses to a compact indicator on mobile.
- Clicking it expands a mini "journey map" showing visited and unvisited sections.

### 2. Progress / journey map
- A vertical path mapped to the main page sections: Home, About, Experience, Projects, Education, Skills, Mentorship, Contact.
- Each section lights up as the visitor scrolls into it.
- Case study subpages (`/goldies-grand-match`, `/shockwave`, `/ai-job-search-system`, `/tv-time-2-0`) count as bonus locations and are also tracked.
- A top-level progress percentage (e.g., "80% explored") is shown in the explorer HUD.

### 3. Animated transitions
- When the active section changes, the bobblehead slides/hops to the new map position.
- Subtle, springy CSS animations (not heavy libraries) to keep the site fast.
- A short celebration animation when the user reaches 100% completion.

### 4. Completion state
- When all main sections and at least one case study have been visited, show a lightweight "Portfolio complete" message with a CTA to book a session or send a message.
- Reset on page reload (session-only state).

## Technical approach
- Track visited sections using `IntersectionObserver` in a new `ExplorerProvider` context.
- Store state in React context only, no `localStorage` per the preference to reset each visit.
- Build a `SiteExplorer` component for the avatar + HUD, plus a `JourneyMap` panel.
- Keep it visually consistent with the existing minimalist light theme; use semantic tokens for colors and shadows.
- Make it dismissible via a small toggle so it never blocks content.

## Files to create/modify
- `src/components/SiteExplorer.tsx` — floating avatar and HUD.
- `src/components/JourneyMap.tsx` — expanded progress map panel.
- `src/context/ExplorerContext.tsx` — section visit tracking and percentage calculation.
- `src/components/Navigation.tsx` — add a small progress indicator next to the logo.
- `src/pages/Index.tsx` — wrap sections with observed IDs.
- `src/pages/AiJobSearchSystem.tsx`, `GoldiesGrandMatch.tsx`, `Shockwave.tsx`, `TvTime2.tsx` — mark case study visits on mount.
- `src/index.css` — add a few animation keyframes for the bobblehead hop and completion pulse.

## Out of scope
- No persistent storage, accounts, or leaderboards.
- No new backend or database changes.
- No mini-games or complex interactive mechanics beyond exploration tracking.

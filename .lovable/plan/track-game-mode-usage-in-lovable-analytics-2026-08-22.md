# Track Game Mode Usage in Lovable Analytics

## Goal
See how many portfolio visitors actually try game mode — using only Lovable's built-in analytics (no external tools like PostHog/GA).

## Key insight
Lovable native analytics doesn't support custom events, but it **does track every client-side route as a pageview** (your `/shockwave` and `/ai-job-search-system` pages already show up in the Pages list). Game mode is currently a route-less overlay, so it's invisible to analytics. Giving it its own URL (`/explore`) makes it show up automatically.

## What you'll see after this change
In the Analytics → Pages list:
- `/` — total homepage visits (existing)
- `/explore` — game mode sessions (new)

Compare `/explore` pageviews against `/` pageviews (or total visitors) to get your "tried game mode" rate. No dashboard setup, no connectors, works on the published site immediately after publishing.

## Changes

### 1. Route ↔ game mode sync (`src/App.tsx`)
- Add a small `GameModeSync` component inside `BrowserRouter` that keeps the URL and game mode in sync both ways:
  - Navigating to `/explore` → opens the Explorer World (`openWorld()`)
  - Leaving `/explore` while the world is open → closes it (`closeWorld()`)
- No new page component needed — `/explore` renders the existing `Index` page with the world overlay on top.

### 2. Navigation toggle uses the route (`src/components/Navigation.tsx`)
- "Game Mode" / "Exit World" buttons call `navigate("/explore")` / `navigate("/")` instead of only flipping context state, so every entry/exit is recorded as a pageview.
- The existing `ExplorerContext` state stays the source of truth for the world UI; the route just drives it.

### 3. Edge cases handled
- **Direct link**: visiting `yoursite.com/explore` opens the portfolio straight into game mode (also makes game mode shareable).
- **Exit from a case study page**: entering game mode from anywhere lands on `/explore`; exiting returns to the homepage.
- **Back/forward buttons**: browser history works naturally since each mode change is a real navigation.
- Verify the GitHub Pages `404.html` SPA fallback still resolves `/explore` correctly (repo has a `deploy.yml` + `404.html`).

## What this does NOT give you (native analytics limitation)
- No per-visitor funnel (you get pageview counts, not "visitor X did Y then Z")
- No tracking of in-world actions (which buildings/sections were entered)

If you later want that level of detail, that's when PostHog would be worth adding — but for "how many people try game mode," this route approach covers it with zero extra tooling.

## Verification
- Enter/exit game mode via nav button, keyboard (Esc), and direct `/explore` URL — confirm world opens/closes and URL updates each time.
- Confirm normal sections, hash links (`/#projects`), and case study pages still work.
- After publishing, confirm `/explore` appears in the Analytics Pages list.

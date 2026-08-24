# Fix: /explore not showing in Analytics

## Diagnosis (confirmed)
- The `/explore` route + route-driven game mode exists only in the **preview build**. The **published site** (pmkarandalal.lovable.app) still serves the old build — visiting `/explore` there returns the 404 page, and clicking "Game Mode" doesn't change the URL.
- Analytics only collects data from the **published site**, so no `/explore` pageviews can be recorded until the new build is published.

## Fix
1. **Publish the project** so the `/explore` route and route-synced game mode go live.
2. **Verify after publishing:**
   - Visit `pmkarandalal.lovable.app`, click "Game Mode" → URL becomes `/explore`, world opens.
   - Visit `pmkarandalal.lovable.app/explore` directly → opens straight into game mode (no 404).
   - Check Analytics → Pages: `/explore` should appear within a short delay.
3. **Fallback if `/explore` still doesn't appear** after publishing: that would mean native analytics only counts full page loads, not in-app (SPA) navigations. In that case I'd switch game mode entry to a real navigation/reload or use a tiny tracking pixel on world open — I'll confirm which applies after the publish test.

## Notes
- No code changes are expected for step 1–2; the implementation is already complete and verified in preview.
- Reminder on reading the data: compare `/explore` pageviews vs `/` pageviews for the "tried game mode" rate.

# Nankana Home Care — AGENTS.md

## Repo at a glance

Zero-framework static site (HTML5 + CSS3 + Vanilla JS). Deployed on Netlify — push to `main` auto-deploys. No build step, no package.json, no tests, no linter, no CI config.

## Architecture

- **5 HTML files**: `index.html`, `about.html`, `services.html`, `join-us.html`, `booking.html`
- **`js/main.js`** — classic `<script>`, injects shared header/footer/WhatsApp FAB on every page. Nav active state driven by `<meta name="page">` in each page's `<head>`.
- **`js/booking-submit.js`** — ES module (`type="module"`), imports Supabase JS client from CDN. Only loaded on `booking.html`. Hardcodes Supabase URL + anon key (public, RLS-protected).
- **`css/style.css`** — Material Design 3–inspired tokens, all in one file.

## Quirks & gotchas

- Nav links reference `index.html`. If you rename or restructure pages, update all nav/footer link paths in `main.js`.
- `booking.html` loads both `main.js` (header/footer injection) and `booking-submit.js` (ES module, form submission to Supabase).
- Supabase RLS policy required (noted in `booking-submit.js`): `CREATE POLICY "Public can insert appointments" ON public.appointments FOR INSERT TO anon WITH CHECK (true);` The `appointments` table columns inserted by the form: `patient_name`, `phone`, `age`, `gender`, `address`, `service`, `preferred_date`, `preferred_time`, `notes`, `status` (defaults to `'pending'`).
- Booking form minimum date is set via an inline `<script>` at the bottom of `booking.html`.

## Commands

No build, test, lint, or typecheck commands exist. Preview locally by opening any `.html` file in a browser or using any static file server.

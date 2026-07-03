# Nankana Home Care — AGENTS.md

## Repo at a glance

Zero-framework single-page static site (HTML5 + CSS3 + Vanilla JS). Deployed via GitHub Pages — push to `main` auto-deploys. No build step, no package.json, no tests, no linter.

Part of a 3-tier ecosystem: this is **Tier 1** (public brochure). Supabase credentials are injected via GitHub Actions secrets.

## Architecture

- **`index.html`** — single-page brochure (hero, services, booking form, blood donation teaser)
- **`blood.html`** — Volunteer Blood Donation portal (standalone, no build step). Two-column layout: donor registration form + emergency matching directory. Fully serverless: uses Supabase (`supabase.from('donors').insert()`) for registration and `supabase.from('donors').select()` for matching. Phone gatekeeper overlay verifies visitors against `donors.phone` before unlocking search. WhatsApp click-to-chat links on result cards. Vanilla JS, scoped CSS — no framework.
- **`js/app.js`** — classic `<script>`, injects shared header/footer/WhatsApp FAB. Handles language toggle (EN/UR), scroll-reveal animations, scroll spy, and Supabase booking form submission. Nav active state driven by scroll position.
- **`css/style.css`** — Material Design 3–inspired tokens, all in one file.

## Key constraints

- Supabase credentials are placeholder tokens (`YOUR_SUPABASE_URL`, `YOUR_SUPABASE_ANON_KEY`) replaced at CI time by `.github/workflows/deploy.yml` — applies to both `js/app.js` and `blood.html`
- The `appointments` table in Supabase has RLS: `CREATE POLICY "Public can insert appointments" ON public.appointments FOR INSERT TO anon WITH CHECK (true);`
- The `donors` table in Supabase has RLS: `CREATE POLICY "Anyone can register as donor" ON public.donors FOR INSERT TO anon WITH CHECK (true);` and `"Registered donors can search" ON public.donors FOR SELECT TO anon USING (true);`
- Booking form minimum date is set via inline JS at the bottom of `index.html`
- Language preference persisted in `localStorage` key `nankana-lang`

## Commands

No build, test, lint, or typecheck commands. Preview locally by opening `index.html` in a browser or using any static file server.

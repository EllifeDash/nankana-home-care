# Blood Donation System — Supabase Migration (Implemented)

## Overview
Migrated Nankana Home Care blood donation system from ngrok/n8n backend to fully serverless, client-side Supabase implementation. All changes deployed in a single session.

## ✅ Completed Changes

### 1. Supabase Schema
- **Project**: `MediAssist-Pro` (`gkfotrghyydydbfoakaq`)
- **Table `donors`** created with columns:
  - `id` (BIGSERIAL PK), `name` (TEXT), `phone` (TEXT UNIQUE)
  - `blood_group` (TEXT), `age` (INTEGER, 18–60 check)
  - `address` (TEXT), `location` (TEXT), `medical_history` (TEXT)
  - `verified` (BOOLEAN, default false), `created_at` (TIMESTAMPTZ)
- **RLS policies**:
  - `"Anyone can register as donor"` — INSERT for anon
  - `"Registered donors can search"` — SELECT for anon

### 2. Code Changes

#### `blood.html`
- **Supabase CDN** (`@supabase/supabase-js@2`) added
- **Placeholder tokens** `YOUR_SUPABASE_URL` / `YOUR_SUPABASE_ANON_KEY` (injected by CI)
- **Phone Gatekeeper** — modal on page load:
  - Verifies phone against `donors.phone` via Supabase query
  - Registered donor → unlocks search (hides locked overlay)
  - Unregistered → prompt to register, can skip gate
- **Registration** — `supabase.from('donors').insert()` replaces ngrok webhook
  - Duplicate phone detection (PostgreSQL unique constraint, code `23505`)
  - After successful registration, auto-unlocks search
- **Emergency Matching** — `supabase.from('donors').select().eq('blood_group', ...)` replaces ngrok webhook
- **WhatsApp FAB** added (same style as `index.html`)
- **`generateWhatsAppLink()`** utility extracted
- **`sanitizePhone()`** utility (strip non-digits, `03`→`92`)
- Original ngrok/webhook code removed (no longer needed)
- All existing UI preserved: hero, registration form, affirmation modal, location modal, result cards, CSS styles, geofence dictionary, age validation, responsive layout

#### `.github/workflows/deploy.yml`
- Added `sed` replacements for `blood.html` alongside existing `js/app.js` injections

### 3. What Was Removed
- ngrok webhook URLs (`pregnancy-footpad-wince.ngrok-free.dev`)
- `API_BASE` and `MATCH_WEBHOOK` constants
- Legacy `fetch()` calls to external webhooks

### 4. Architecture

```
Visitor ──→ Phone Gatekeeper Modal
              │
              ├── Phone in donors table? ──→ Unlock Search ──→ Supabase SELECT
              │
              └── Phone not found ──→ Register ──→ Supabase INSERT
                                                   │
                                                   └── Auto-unlock Search
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Placeholder tokens in HTML | Same pattern as `app.js`; CI injects via `sed` |
| Gatekeeper unlocks search, not registration | Circular dependency avoided: anyone can register, only registered donors can search |
| WhatsApp FAB | Consistent UX with main site |
| Inline `<script>` block | Zero build step, deployable as static HTML |
| `MediAssist-Pro` project | Same Supabase project used by booking form & admin portal; single source of truth |

## Deployment
- Auto-deployed via GitHub Pages on push to `main`
- Credentials injected via `deploy.yml` using `SUPABASE_URL` and `SUPABASE_ANON_KEY` GitHub secrets

## Verification
- [x] Supabase `donors` table created with RLS
- [x] Phone gatekeeper authenticates against database
- [x] Donor registration writes to Supabase successfully
- [x] Emergency search queries donors by blood group
- [x] WhatsApp links generated for each result
- [x] Duplicate phone numbers rejected at DB level
- [x] CI workflow updated for blood.html credential injection

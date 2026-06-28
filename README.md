# Nankana Home Care — Public Web Brochure

**Tier 1** of the Nankana Home Care three-tier ecosystem.

| Tier | Product | Role |
|------|---------|------|
| 1 | **Nankana Home Care** *(this repo)* | Public-facing single-page brochure site with online appointment booking |
| 2 | [MediAssist Pro PWA](https://github.com/ellifedash/mediassist-pro) | Offline-first patient management app for medical assistants |
| 3 | [NHC Admin Portal](https://github.com/ellifedash/nhc-admin-portal) | Secure admin dashboard for staff onboarding and magic-link dispatch |

---

## Overview

This repository contains the lightweight, single-page marketing website for Nankana Home Care. It introduces medical services to the local community and hosts the public appointment reservation engine that streams booking data directly into the same Supabase database used by MediAssist Pro and the Admin Portal.

Built with Vanilla JS and styled using Material Design 3 tokens — zero frameworks, zero build steps.

## Project Structure

```
nankana-home-care/
├── index.html          # Single-page brochure (hero, services, booking form, blood teaser)
├── blood.html          # Volunteer Blood Donation portal (standalone, no build step)
├── css/
│   └── style.css       # Material Design 3–inspired stylesheet
├── js/
│   └── app.js          # Layout injection, language toggle, booking form (Supabase)
├── assets/             # Images and media assets
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions — injects Supabase secrets from repo vars
├── AGENTS.md           # AI-assisted development instructions
└── README.md
```

## Integration Loop

1. **Patients** book appointments via this site → stored in Supabase `appointments` table
2. **Medical assistants** (MediAssist Pro) view and manage those bookings in their PWA
3. **Administrators** (NHC Admin Portal) onboard new staff and send magic links

## Blood Donation Portal

The `blood.html` page is a standalone volunteer blood bank system with two functions:

1. **Donor Registration** — submits to `POST /api/donors/register` on an external Express/Google Sheets backend
2. **Emergency Matching** — queries `POST /api/donors/match` and displays verified donors with tap-to-call dialer

**Configuration:** Update `API_BASE` in `blood.html` (line ~205) to point to the deployed backend before going live.

## Deployment

Auto-deployed via GitHub Pages. Push to `main` triggers a deploy.

Supabase credentials (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) are injected at build time from GitHub Secrets.

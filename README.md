<div align="center">

# 🏥 Nankana Home Care — Public Website

**The official, public-facing marketing and reservation website for Nankana Home Care services.**

[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=flat-square&logo=netlify)](https://netlify.com)
[![Vanilla JS](https://img.shields.io/badge/Frontend-Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript&logoColor=000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)

</div>

---

## 📌 Overview_

This repository contains the lightweight, multi-page static marketing website for **Nankana Home Care**. It introduces our medical services to the local community, handles recruitment inquiries, and hosts the public appointment reservation engine that syncs directly with our internal staff platform.

Built with **Vanilla JS** and styled natively using **Material Design 3 tokens**, this site features zero frameworks, zero heavy dependencies, and zero build steps—ensuring lightning-fast loading speeds on mobile data networks.

---

## 📂 Project Structure

```text
nankana-home-care/
├── index.html          # Home Page (Hero section & trust factors)
├── about.html          # Who Are We? (Mission & medical team bio)
├── services.html       # Our Services (Detailed healthcare catalog)
├── join-us.html        # Join Our Team (Recruitment intake)
├── booking.html        # Book an Appointment (The patient intake form)
├── css/
│   └── style.css       # Core styling & Material Design 3 CSS tokens
└── js/
    ├── main.js         # Layout Injector (Injects shared navigation & footer)
    └── booking-submit.js # Booking Engine (Securely pushes data to Supabase)
    ✨ Features & Architecture
Zero-Framework Architecture: Handcrafted with pure semantic HTML5, CSS3, and modern Vanilla ES2022 JavaScript.

DRY Component Injection: Navigation menus and footers are dynamically injected across all pages via a lightweight layout script, making global menu updates instant without file duplication.

Direct Database Streaming: The appointment booking form captures patient intake information and streams it securely to our centralized database using an optimized public client interface.

Production-Grade Security: Locked down via strict Supabase Row-Level Security (RLS) rules. Public anonymous clients possess exclusive INSERT permissions on the appointments table, guaranteeing total patient privacy.

🚀 Deployment
The site is built to be deployed on Netlify directly from the main branch.

Push updates to GitHub.

Netlify auto-deploys the static assets instantly.

No build steps or runtime compilation required.

📄 License
This project is licensed under a Proprietary License. All rights reserved.
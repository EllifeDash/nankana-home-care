// ════════════════════════════════════════
// booking-submit.js
// Landing page — public appointment insert
//
// Load AFTER the Supabase CDN script.
// Uses the anon/public key — RLS must allow
// INSERT for the anon role on `appointments`.
//
// Required SQL policy (run once in Supabase):
//   CREATE POLICY "Public can insert appointments"
//   ON public.appointments FOR INSERT
//   TO anon WITH CHECK (true);
// ════════════════════════════════════════

import { createClient }
  from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ── Replace with your project credentials ──
const SUPABASE_URL      = 'SUPABASE_URL';
const SUPABASE_ANON_KEY = 'SUPABASE_ANON_KEY';

const _sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── DOM refs ──────────────────────────────
const form        = document.getElementById('bookingForm');
const successPane = document.getElementById('formSuccess');
const submitBtn   = form?.querySelector('[type="submit"]');

// ── Submit handler ────────────────────────
form?.addEventListener('submit', async e => {
  e.preventDefault();

  // Basic client-side guard
  const name    = document.getElementById('f-name').value.trim();
  const phone   = document.getElementById('f-phone').value.trim();
  const address = document.getElementById('f-address').value.trim();
  const service = document.getElementById('f-service').value;
  const date    = document.getElementById('f-date').value;
  const time    = document.getElementById('f-time').value;

  if (!name || !phone || !address || !service || !date || !time) {
    alert('Please fill in all required fields.');
    return;
  }

  // Loading state
  const origLabel       = submitBtn.textContent;
  submitBtn.disabled    = true;
  submitBtn.textContent = 'Sending…';

  // ── Build the row ──
  // `status` defaults to 'pending' in the DB column definition,
  // but setting it explicitly makes intent clear.
  const appointment = {
    patient_name: name,
    phone,
    age:          document.getElementById('f-age').value     || null,
    gender:       document.getElementById('f-gender').value  || null,
    address,
    service,
    preferred_date: date,
    preferred_time: time,
    notes:        document.getElementById('f-notes').value.trim() || null,
    status:       'pending',         // awaiting staff action
    // handled_by intentionally omitted — set by app staff on accept
  };

  // ── Insert ────────────────────────────
  const { error } = await _sb
    .from('appointments')
    .insert([appointment]);

  if (error) {
    console.error('[booking] insert error:', error.message);
    submitBtn.disabled    = false;
    submitBtn.textContent = origLabel;
    alert('Something went wrong. Please try again or call us directly.');
    return;
  }

  // ── Success transition ────────────────
  form.style.display        = 'none';
  successPane.style.display = 'block';
  successPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

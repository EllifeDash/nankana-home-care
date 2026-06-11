// ════════════════════════════════════════
// app.js — Single-page brochure controller
// Nankana Home Care
// ════════════════════════════════════════

// ── Configuration ──────────────────────────

const WHATSAPP_NUMBER = '923240096098';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20want%20to%20book%20a%20home%20care%20appointment`;

const SUPABASE_URL = 'https://gkfotrghyydydbfoakaq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZm90cmdoeXlkeWRiZm9ha2FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNzk4MzEsImV4cCI6MjA5Mjg1NTgzMX0.sXZRa4tO8AkUQ-Sn34rqjatlLCXbt7dRrdi9qcq1-Lc';

const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── HTML Templates ─────────────────────────

const HEADER_HTML = `
<header id="site-header">
  <div class="nav-inner">
    <a href="#hero" class="nav-logo">
      <div class="nav-logo-icon">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="2">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
          <path d="M12 8v8M8 12h8"/>
        </svg>
      </div>
      <span class="lang-en">Nankana <em>Home Care</em></span>
      <span class="lang-ur" dir="rtl">ننکانہ ہوم کیئر</span>
    </a>

    <ul class="nav-links">
      <li><a href="#hero" data-section="hero"><span class="lang-en">Home</span><span class="lang-ur" dir="rtl">ہوم</span></a></li>
      <li><a href="#about" data-section="about"><span class="lang-en">About</span><span class="lang-ur" dir="rtl">تعارف</span></a></li>
      <li><a href="#services" data-section="services"><span class="lang-en">Services</span><span class="lang-ur" dir="rtl">خدمات</span></a></li>
      <li><a href="#booking" class="nav-cta" data-section="booking"><span class="lang-en">Book Now</span><span class="lang-ur" dir="rtl">بک کریں</span></a></li>
    </ul>

    <div class="nav-actions">
      <button class="lang-switcher" id="langToggle" aria-label="Switch language">
        <span class="lang-en">EN / اردو</span>
        <span class="lang-ur" dir="rtl">UR / English</span>
      </button>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<nav class="nav-mobile" id="navMobile" role="navigation" aria-label="Mobile navigation">
  <ul>
    <li><a href="#hero" data-section="hero"><span class="lang-en">Home</span><span class="lang-ur" dir="rtl">ہوم</span></a></li>
    <li><a href="#about" data-section="about"><span class="lang-en">About Us</span><span class="lang-ur" dir="rtl">تعارف</span></a></li>
    <li><a href="#services" data-section="services"><span class="lang-en">Our Services</span><span class="lang-ur" dir="rtl">خدمات</span></a></li>
    <li><a href="#booking" class="nav-cta" data-section="booking"><span class="lang-en">Book Now</span><span class="lang-ur" dir="rtl">ابھی بک کریں</span></a></li>
  </ul>
</nav>`;

const FOOTER_HTML = `
<footer id="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#hero" class="nav-logo">
          <div class="nav-logo-icon">
            <svg viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="2">
              <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
              <path d="M12 8v8M8 12h8"/>
            </svg>
          </div>
          <span class="lang-en">Nankana <em>Home Care</em></span>
          <span class="lang-ur" dir="rtl">ننکانہ ہوم کیئر</span>
        </a>
        <p>
          <span class="lang-en">Professional home healthcare across Nankana Sahib and surrounding areas. Trusted by hundreds of families.</span>
          <span class="lang-ur" dir="rtl">ننکانہ صاحب اور گردونواح میں پیشہ ورانہ ہوم ہیلتھ کیئر۔ سینکڑوں خاندانوں کا اعتماد۔</span>
        </p>
      </div>
      <div class="footer-col">
        <h5><span class="lang-en">Quick Links</span><span class="lang-ur" dir="rtl">فوری روابط</span></h5>
        <ul>
          <li><a href="#hero"><span class="lang-en">Home</span><span class="lang-ur" dir="rtl">ہوم</span></a></li>
          <li><a href="#about"><span class="lang-en">About Us</span><span class="lang-ur" dir="rtl">تعارف</span></a></li>
          <li><a href="#services"><span class="lang-en">Services</span><span class="lang-ur" dir="rtl">خدمات</span></a></li>
          <li><a href="#booking"><span class="lang-en">Book Now</span><span class="lang-ur" dir="rtl">بک کریں</span></a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5><span class="lang-en">Contact</span><span class="lang-ur" dir="rtl">رابطہ</span></h5>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.6a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z"/></svg>
          <span>+92 324 0096098</span>
        </div>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span>info@nankanacare.pk</span>
        </div>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>Nankana Sahib, Punjab</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} Nankana Home Care. All rights reserved.</span>
      <span class="lang-en">Built with care for better home healthcare</span>
      <span class="lang-ur" dir="rtl">بہتر ہوم ہیلتھ کیئر کے لیے بنایا گیا</span>
    </div>
  </div>
</footer>`;

const WA_FLOAT_HTML = `
<a href="${WHATSAPP_URL}"
   class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
</a>`;

// ── State ──────────────────────────────────

let currentLang = 'en';

// ── 1. Language Gate ──────────────────────

function initLanguageGate() {
  const modal = document.getElementById('langModal');
  const toggle = document.getElementById('langToggle');
  const saved = localStorage.getItem('nankana-lang');

  if (saved === 'en' || saved === 'ur') {
    modal.classList.add('hidden');
    applyLanguage(saved);
  }

  modal.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('nankana-lang', lang);
      modal.classList.add('hidden');
      applyLanguage(lang);
    });
  });

  toggle.addEventListener('click', () => {
    const next = currentLang === 'en' ? 'ur' : 'en';
    localStorage.setItem('nankana-lang', next);
    applyLanguage(next);
  });
}

function applyLanguage(lang) {
  currentLang = lang;
  document.body.classList.remove('show-en', 'show-ur');
  document.body.classList.add(`show-${lang}`);
  document.documentElement.lang = lang === 'ur' ? 'ur' : 'en';
  updateFormLanguage(lang);
}

function updateFormLanguage(lang) {
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    el.placeholder = lang === 'ur' ? el.dataset.urPlaceholder : el.dataset.enPlaceholder;
  });
  document.querySelectorAll('#f-service option, #f-gender option').forEach(opt => {
    const en = opt.getAttribute('data-en');
    const ur = opt.getAttribute('data-ur');
    if (en && ur) opt.textContent = lang === 'ur' ? ur : en;
  });
  document.querySelectorAll('#f-service optgroup').forEach(g => {
    const en = g.getAttribute('data-en');
    const ur = g.getAttribute('data-ur');
    if (en && ur) g.label = lang === 'ur' ? ur : en;
  });
}

// ── 2. Layout Injection ────────────────────

function injectLayout() {
  const headerSlot = document.getElementById('header-slot');
  if (headerSlot) headerSlot.outerHTML = HEADER_HTML;

  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) footerSlot.outerHTML = FOOTER_HTML;

  document.body.insertAdjacentHTML('beforeend', WA_FLOAT_HTML);

  const waHero = document.getElementById('heroWhatsApp');
  if (waHero) waHero.href = WHATSAPP_URL;
}

// ── 3. Mobile Menu ─────────────────────────

function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (!toggle || !mobile) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobile.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobile.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', e => {
    if (!mobile.contains(e.target) && !toggle.contains(e.target)) {
      mobile.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });
}

// ── 4. Scroll Behaviour ────────────────────

function initScrollBehaviour() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── 5. Scroll-reveal Animation ─────────────

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('visible'), +delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

// ── 6. Scroll Spy ──────────────────────────

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('[data-section]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.25, rootMargin: '-72px 0px 0px 0px' });

  sections.forEach(s => observer.observe(s));
}

// ── 7. Booking Form (Supabase) ────────────

function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const successPane = document.getElementById('formSuccess');
  if (!form) return;

  const submitBtn = form.querySelector('[type="submit"]');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = document.getElementById('f-name').value.trim();
    const phone = document.getElementById('f-phone').value.trim();
    const address = document.getElementById('f-address').value.trim();
    const service = document.getElementById('f-service').value;
    const date = document.getElementById('f-date').value;
    const time = document.getElementById('f-time').value;

    if (!name || !phone || !address || !service || !date || !time) {
      const msg = currentLang === 'ur'
        ? 'براہ کرم تمام ضروری فیلڈز پُر کریں۔'
        : 'Please fill in all required fields.';
      alert(msg);
      return;
    }

    const origLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = currentLang === 'ur' ? 'بھیجا جا رہا ہے…' : 'Sending…';

    const appointment = {
      patient_name: name,
      patient_phone: phone,
      patient_age: document.getElementById('f-age').value || null,
      patient_gender: document.getElementById('f-gender').value || null,
      patient_address: address,
      requested_service: service,
      preferred_date: date,
      preferred_time: time,
      notes: document.getElementById('f-notes').value.trim() || null,
      status: 'pending',
      admin_comment: null,
    };

    const { error } = await _sb
      .from('appointments')
      .insert([appointment]);

    if (error) {
      console.error('[booking] insert error:', error.message);
      submitBtn.disabled = false;
      submitBtn.textContent = origLabel;
      const msg = currentLang === 'ur'
        ? 'کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں یا ہمیں براہ راست کال کریں۔'
        : 'Something went wrong. Please try again or call us directly.';
      alert(msg);
      return;
    }

    form.style.display = 'none';
    successPane.style.display = 'block';
    successPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('f-date');
  if (dateInput) dateInput.setAttribute('min', today);
}

// ── Init ───────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  initLanguageGate();
  initMobileMenu();
  initScrollBehaviour();
  initReveal();
  initScrollSpy();
  initBookingForm();
});

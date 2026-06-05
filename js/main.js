// ════════════════════════════════════════
// main.js — Shared Layout Injector
// Nankana Home Care · Phase 1 Frontend
//
// Injects: header, footer, WhatsApp FAB
// Handles: mobile menu, scroll effects,
//          active nav state, reveal anim
// ════════════════════════════════════════

// ── HTML Templates ────────────────────────

const HEADER_HTML = `
<header id="site-header">
  <div class="nav-inner">
    <!-- Logo -->
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-icon">
        <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
          <path d="M12 8v8M8 12h8"/>
        </svg>
      </div>
      Nankana <em>Home Care</em>
    </a>

    <!-- Desktop nav -->
    <ul class="nav-links">
      <li><a href="index.html"     data-page="home">Home</a></li>
      <li><a href="about.html"    data-page="about">About</a></li>
      <li><a href="services.html" data-page="services">Services</a></li>
      <li><a href="join-us.html"  data-page="join-us">Join Us</a></li>
      <li><a href="booking.html"  class="nav-cta" data-page="booking">Book Now</a></li>
    </ul>

    <!-- Mobile hamburger -->
    <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<!-- Mobile dropdown -->
<nav class="nav-mobile" id="navMobile" role="navigation" aria-label="Mobile navigation">
  <ul>
    <li><a href="index.html"     data-page="home">Home</a></li>
    <li><a href="about.html"    data-page="about">About Us</a></li>
    <li><a href="services.html" data-page="services">Our Services</a></li>
    <li><a href="join-us.html"  data-page="join-us">Join Our Team</a></li>
    <li><a href="booking.html"  class="nav-cta btn" data-page="booking">Book an Appointment</a></li>
  </ul>
</nav>`;

const FOOTER_HTML = `
<footer id="site-footer">
  <div class="container">
    <div class="footer-grid">

      <!-- Brand -->
      <div class="footer-brand">
        <a href="index.html" class="nav-logo">
          <div class="nav-logo-icon">
            <svg viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="2">
              <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
              <path d="M12 8v8M8 12h8"/>
            </svg>
          </div>
          Nankana <em>Home Care</em>
        </a>
        <p>Bringing professional healthcare to your doorstep across Nankana Sahib and surrounding areas. Trusted by hundreds of families.</p>
      </div>

      <!-- Quick Links -->
      <div class="footer-col">
        <h5>Quick Links</h5>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="services.html">Our Services</a></li>
          <li><a href="join-us.html">Join Our Team</a></li>
          <li><a href="booking.html">Book Now</a></li>
        </ul>
      </div>

      <!-- Services -->
      <div class="footer-col">
        <h5>Services</h5>
        <ul>
          <li><a href="services.html">Injections &amp; IV Drips</a></li>
          <li><a href="services.html">Blood Sample Collection</a></li>
          <li><a href="services.html">Wound Dressing</a></li>
          <li><a href="services.html">Vitals Monitoring</a></li>
          <li><a href="services.html">Post-Op Care</a></li>
          <li><a href="services.html">Medicine Delivery</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="footer-col">
        <h5>Contact</h5>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.6a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z"/></svg>
          <span>+92 300 0000000</span>
        </div>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span>info@nankanacare.pk</span>
        </div>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>Nankana Sahib, Punjab, Pakistan</span>
        </div>
      </div>

    </div><!-- /.footer-grid -->

    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} Nankana Home Care. All rights reserved.</span>
      <span>Built with ♥ for better home healthcare</span>
    </div>
  </div>
</footer>`;

const WA_FLOAT_HTML = `
<a href="https://wa.me/923000000000?text=Hello%2C%20I%20want%20to%20book%20a%20home%20care%20appointment"
   class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
</a>`;

// ── Inject Layout ─────────────────────────

function injectLayout() {
  // Header
  const headerSlot = document.getElementById('header-slot');
  if (headerSlot) {
    headerSlot.outerHTML = HEADER_HTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
  }

  // Footer
  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) {
    footerSlot.outerHTML = FOOTER_HTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
  }

  // WhatsApp float
  document.body.insertAdjacentHTML('beforeend', WA_FLOAT_HTML);
}

// ── Active Nav Link ────────────────────────
// Matches data-page attribute against <meta name="page"> in each HTML file.

function setActiveNav() {
  const meta = document.querySelector('meta[name="page"]');
  if (!meta) return;
  const page = meta.content;
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
  });
}

// ── Mobile Menu Toggle ─────────────────────

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

  // Close on link click
  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobile.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!mobile.contains(e.target) && !toggle.contains(e.target)) {
      mobile.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });
}

// ── Scroll Behaviour ───────────────────────
// Adds `.scrolled` to header after 12px for shadow effect.

function initScrollBehaviour() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

// ── Scroll-reveal Animation ────────────────
// Elements with `.reveal` fade+slide up when they enter viewport.

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

// ── Init ──────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  setActiveNav();
  initMobileMenu();
  initScrollBehaviour();
  initReveal();
});

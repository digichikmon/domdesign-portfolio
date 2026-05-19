/* ============================================================
   DOMDESIGN.CA — script.js
   Minimal vanilla JS. No frameworks, no dependencies.
   Responsibilities:
     1. Mobile navigation toggle (with proper ARIA state)
     2. Close the mobile nav after a link is selected
     3. Smooth in-page scrolling (respects reduced-motion)
     4. Update the current year automatically (if needed)
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. MOBILE NAV TOGGLE
     ---------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* Close the menu after a link is clicked (mobile UX) */
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (primaryNav.classList.contains('is-open')) {
          primaryNav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ----------------------------------------------------------
     2. SMOOTH IN-PAGE SCROLLING
     Respects the user's "prefers-reduced-motion" setting.
     ---------------------------------------------------------- */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (!href || href === '#') return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        /* Move focus for accessibility after scroll */
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ----------------------------------------------------------
     3. YEAR AUTO-UPDATE (optional helper)
     If you decide later to replace the hard-coded 2026 in the
     footer with a dynamic year, give the element id="year"
     and this will update it.
     ---------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();

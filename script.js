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
     3. PROJECT CAROUSELS
     ---------------------------------------------------------- */
  document.querySelectorAll('.project-carousel').forEach(function (carousel) {
    var track    = carousel.querySelector('.carousel-track');
    var slides   = carousel.querySelectorAll('.carousel-slide');
    var dots     = carousel.querySelectorAll('.carousel-dot');
    var btnPrev  = carousel.querySelector('.carousel-btn--prev');
    var btnNext  = carousel.querySelector('.carousel-btn--next');
    var total    = slides.length;
    var current  = 0;
    var touchStartX = 0;

    if (total < 2) {
      if (btnPrev) btnPrev.hidden = true;
      if (btnNext) btnNext.hidden = true;
      carousel.querySelector('.carousel-indicators') &&
        (carousel.querySelector('.carousel-indicators').hidden = true);
      return;
    }

    function goTo(index) {
      current = ((index % total) + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-current', i === current ? 'true' : 'false');
      });
    }

    if (btnPrev) btnPrev.addEventListener('click', function (e) {
      e.stopPropagation(); goTo(current - 1);
    });
    if (btnNext) btnNext.addEventListener('click', function (e) {
      e.stopPropagation(); goTo(current + 1);
    });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function (e) { e.stopPropagation(); goTo(i); });
    });

    /* Swipe support */
    carousel.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      var delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 40) goTo(delta > 0 ? current + 1 : current - 1);
    }, { passive: true });

    goTo(0);
  });

  /* ----------------------------------------------------------
     4. YEAR AUTO-UPDATE (optional helper)
     Give the footer year element id="year" to auto-update it.
     ---------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();

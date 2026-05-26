/* ============================================================
   DOMDESIGN.CA — script.js
   GSAP + Lenis + Carousels + Nav
   ============================================================ */

(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lenis = null;

  /* ----------------------------------------------------------
     1. LENIS + GSAP SETUP
     ---------------------------------------------------------- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (!prefersReduced && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    });

    if (typeof gsap !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      })(performance.now());
    }
  }

  /* ----------------------------------------------------------
     2. GSAP SCROLL REVEALS
     ---------------------------------------------------------- */
  if (!prefersReduced && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

    gsap.utils.toArray('.js-reveal').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: 0.72,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    gsap.utils.toArray('.js-stagger').forEach(function (container) {
      gsap.fromTo(Array.from(container.children),
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.09,
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

  }

  /* ----------------------------------------------------------
     3. MOBILE NAV TOGGLE
     ---------------------------------------------------------- */
  var navToggle  = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

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
     4. SMOOTH IN-PAGE SCROLLING (fallback — no Lenis)
     ---------------------------------------------------------- */
  if (!prefersReduced && typeof Lenis === 'undefined') {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ----------------------------------------------------------
     5. PROJECT CAROUSELS
     ---------------------------------------------------------- */
  document.querySelectorAll('.project-carousel').forEach(function (carousel) {
    var track   = carousel.querySelector('.carousel-track');
    var slides  = carousel.querySelectorAll('.carousel-slide');
    var dots    = carousel.querySelectorAll('.carousel-dot');
    var btnPrev = carousel.querySelector('.carousel-btn--prev');
    var btnNext = carousel.querySelector('.carousel-btn--next');
    var total   = slides.length;
    var current = 0;
    var touchStartX = 0;

    if (total < 2) {
      if (btnPrev) btnPrev.hidden = true;
      if (btnNext) btnNext.hidden = true;
      var indicators = carousel.querySelector('.carousel-indicators');
      if (indicators) indicators.hidden = true;
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

    if (btnPrev) btnPrev.addEventListener('click', function (e) { e.stopPropagation(); goTo(current - 1); });
    if (btnNext) btnNext.addEventListener('click', function (e) { e.stopPropagation(); goTo(current + 1); });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function (e) { e.stopPropagation(); goTo(i); });
    });

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
     6. ACTIVE NAV STATE
     ---------------------------------------------------------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.primary-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    var linkPage = href.split('/').pop().split('#')[0] || 'index.html';
    if (linkPage === currentPage) link.classList.add('is-active');
  });

  /* ----------------------------------------------------------
     7. PORTFOLIO FILTER (projects.html)
     ---------------------------------------------------------- */
  var filterBtns    = document.querySelectorAll('.filter-btn');
  var portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length && portfolioItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.dataset.filter;
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        portfolioItems.forEach(function (item) {
          item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
        });
      });
    });
  }

  /* ----------------------------------------------------------
     8. YEAR AUTO-UPDATE
     ---------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------
     9. BACK TO TOP
     ---------------------------------------------------------- */
  var bttBtn      = document.getElementById('backToTop');
  var bttProgress = document.querySelector('.back-to-top-ring-progress');
  var CIRCUMFERENCE = 119.38;

  if (bttBtn) {
    function updateBackToTop() {
      var scrollY  = window.scrollY || document.documentElement.scrollTop;
      var docH     = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docH > 0 ? scrollY / docH : 0;

      if (bttProgress) {
        bttProgress.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
      }

      if (scrollY > 400) {
        bttBtn.classList.add('is-visible');
      } else {
        bttBtn.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();

    bttBtn.addEventListener('click', function () {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

})();

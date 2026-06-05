// Shared header + footer. Each page declares data-page="home|portfolio|services|contact".
(function () {
  const page = document.body.dataset.page || '';

  const header = `
    <header class="site-header">
      <div class="wrap">
        <a class="wordmark" href="index.html">Dom<em>Design</em></a>
        <nav class="nav" aria-label="Primary">
          <a href="index.html" ${page === 'home' ? 'class="is-active"' : ''}>Index</a>
          <a href="portfolio.html" ${page === 'portfolio' ? 'class="is-active"' : ''}>Portfolio</a>
          <a href="services.html" ${page === 'services' ? 'class="is-active"' : ''}>Services</a>
          <a href="contact.html" ${page === 'contact' ? 'class="is-active"' : ''}>Contact</a>
        </nav>
      </div>
    </header>`;

  const footer = `
    <footer class="site-footer">
      <div class="wrap">
        <div class="col">
          <div class="brand">Dom<em style="font-style:italic;font-weight:300;">Design</em></div>
        </div>
        <div class="col">
          <h4>Contact</h4>
          <a href="mailto:digidesign73@gmail.com">digidesign73@gmail.com</a>
          <a href="https://instagram.com/digidesign2021" target="_blank" rel="noopener">Instagram / digidesign2021</a>
        </div>
        <div class="col">
          <h4>Index</h4>
          <a href="index.html">Home</a>
          <a href="portfolio.html">Portfolio</a>
          <a href="services.html">Services</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="col" style="text-align:right;">
          <h4>Colophon</h4>
          <span>© 2026 DomDesign</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>`;

  document.getElementById('site-header-slot')?.insertAdjacentHTML('beforebegin', header);
  document.getElementById('site-header-slot')?.remove();
  document.getElementById('site-footer-slot')?.insertAdjacentHTML('afterend', footer);
  document.getElementById('site-footer-slot')?.remove();
})();

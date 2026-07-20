(function() {
  "use strict";

  const body = document.body;
  const header = document.querySelector('#header');
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const scrollTopBtn = document.querySelector('.scroll-top');

  function toggleScrolled() {
    if (!header) return;

    if (!header.classList.contains('scroll-up-sticky') && !header.classList.contains('sticky-top') && !header.classList.contains('fixed-top')) {
      return;
    }

    body.classList.toggle('scrolled', window.scrollY > 100);
  }

  function toggleMobileNav() {
    body.classList.toggle('mobile-nav-active');

    if (!mobileNavToggleBtn) return;

    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
    mobileNavToggleBtn.setAttribute('aria-expanded', body.classList.contains('mobile-nav-active') ? 'true' : 'false');
  }

  document.addEventListener('scroll', toggleScrolled, { passive: true });
  window.addEventListener('load', toggleScrolled);

  if (header && header.classList.contains('scroll-up-sticky')) {
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
        header.style.setProperty('position', 'sticky', 'important');
        header.style.top = `-${header.offsetHeight + 50}px`;
      } else if (scrollTop > header.offsetHeight) {
        header.style.setProperty('position', 'sticky', 'important');
        header.style.top = '0';
      } else {
        header.style.removeProperty('top');
        header.style.removeProperty('position');
      }

      lastScrollTop = scrollTop;
    }, { passive: true });
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', toggleMobileNav);
    mobileNavToggleBtn.setAttribute('aria-expanded', 'false');
  }

  document.querySelectorAll('#navmenu a').forEach((navLink) => {
    navLink.addEventListener('click', () => {
      if (body.classList.contains('mobile-nav-active')) {
        toggleMobileNav();
      }
    });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach((toggle) => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling?.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('active', window.scrollY > 100);
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop, { passive: true });

  function aosInit() {
    if (typeof AOS === 'undefined') return;

    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  window.addEventListener('load', aosInit);

  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    const carousel = carouselIndicator.closest('.carousel');
    if (!carousel) return;

    carousel.querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      carouselIndicator.insertAdjacentHTML(
        'beforeend',
        `<li data-bs-target="#${carousel.id}" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>`
      );
    });
  });

  function initSwiper() {
    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll('.init-swiper').forEach((swiperElement) => {
      const configElement = swiperElement.querySelector('.swiper-config');
      if (!configElement) return;

      const config = JSON.parse(configElement.innerHTML.trim());

      if (swiperElement.classList.contains('swiper-tab')) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener('load', initSwiper);

  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox'
    });
  }
})();

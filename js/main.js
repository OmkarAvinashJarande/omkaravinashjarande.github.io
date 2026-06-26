/* ============================================================
   OMKAR JARANDE PORTFOLIO — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     MOBILE MENU
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);

    // Animate hamburger → X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) toggleMenu();
    });
  });

  /* ----------------------------------------------------------
     NAV SCROLL EFFECT
  ---------------------------------------------------------- */
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.style.borderBottomColor = 'rgba(0,0,0,0.1)';
    } else {
      nav.style.borderBottomColor = 'rgba(0,0,0,0.08)';
    }
  }, { passive: true });

  /* ----------------------------------------------------------
     ACTIVE NAV LINK
  ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 80;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        if (!link.classList.contains('nav-cta')) {
          link.style.color = '#1d1d1f';
        }
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* ----------------------------------------------------------
     SCROLL REVEAL
  ---------------------------------------------------------- */
  function addRevealClasses() {
    const targets = [
      '.timeline-item',
      '.project-card',
      '.skills-group',
      '.education-item',
      '.cert-item',
      '.about-facts .fact',
      '.contact-link',
    ];

    targets.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 60}ms`;
      });
    });
  }

  function observeReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  addRevealClasses();
  observeReveal();

  /* ----------------------------------------------------------
     SMOOTH SCROLL FOR ANCHOR LINKS
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

})();

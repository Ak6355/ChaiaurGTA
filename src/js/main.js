/* CHAI AUR GTA — Main Interactions + Three.js Background */

import '../css/style.css';
import { createThreeBackground } from './three-bg.js';

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ========== THREE.JS BACKGROUND ==========
  const bgContainer = document.getElementById('three-bg');
  if (bgContainer) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    if (!prefersReduced && !isLowEnd) {
      createThreeBackground(bgContainer);
    } else {
      bgContainer.classList.add('fallback-bg');
    }
  }

  // ========== PRELOADER ==========
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      initHeroAnimations();
    }, 1800);
  });

  setTimeout(() => {
    if (!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      initHeroAnimations();
    }
  }, 3000);

  // ========== HEADER SCROLL ==========
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // ========== MOBILE MENU ==========
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const spans = menuToggle.querySelectorAll('span');

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');

    if (isOpen) {
      gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 });
      gsap.to(spans[1], { opacity: 0, duration: 0.2 });
      gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 });
    } else {
      gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(spans[1], { opacity: 1, duration: 0.2 });
      gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
      gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(spans[1], { opacity: 1, duration: 0.2 });
      gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
    });
  });

  // ========== HERO ENTRANCE ==========
  function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-title .line', {
      opacity: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.18
    })
    .to('.hero-eyebrow', { opacity: 1, duration: 0.7 }, '-=0.7')
    .to('.hero-tagline', { opacity: 1, duration: 0.8 }, '-=0.5')
    .to('.hero-ctas', { opacity: 1, duration: 0.8 }, '-=0.5')
    .to('.scroll-indicator', { opacity: 0.8, duration: 0.6 }, '-=0.3');
  }

  // ========== SCROLL REVEALS ==========
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out'
    });
  });

  gsap.from('.about-text', {
    scrollTrigger: { trigger: '.about-grid', start: 'top 80%' },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
  });
  gsap.from('.about-visual', {
    scrollTrigger: { trigger: '.about-grid', start: 'top 80%' },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.stream-card', {
    scrollTrigger: {
      trigger: '.streams-grid',
      start: 'top 85%'
    },
    opacity: 0,
    y: 70,
    duration: 0.85,
    stagger: 0.12,
    ease: 'power3.out'
  });

  gsap.from('.gallery-item', {
    scrollTrigger: {
      trigger: '.gallery-grid',
      start: 'top 85%'
    },
    opacity: 0,
    scale: 0.9,
    y: 40,
    duration: 0.75,
    stagger: 0.08,
    ease: 'power2.out'
  });

  gsap.from('.social-card', {
    scrollTrigger: {
      trigger: '.social-grid',
      start: 'top 85%'
    },
    opacity: 0,
    y: 50,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out'
  });

  gsap.from('.contact-form', {
    scrollTrigger: { trigger: '.contact-wrapper', start: 'top 85%' },
    opacity: 0,
    x: -40,
    duration: 0.9,
    ease: 'power3.out'
  });
  gsap.from('.contact-info', {
    scrollTrigger: { trigger: '.contact-wrapper', start: 'top 85%' },
    opacity: 0,
    x: 40,
    duration: 0.9,
    ease: 'power3.out'
  });

  // ========== PARALLAX ==========
  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 120,
    opacity: 0.3,
    ease: 'none'
  });

  gsap.utils.toArray('.section-label').forEach(label => {
    gsap.to(label, {
      scrollTrigger: {
        trigger: label,
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: 1
      },
      x: 30,
      ease: 'none'
    });
  });

  // ========== SMOOTH ANCHOR ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: target, offsetY: 70 },
          ease: 'power3.inOut'
        });
      }
    });
  });

  // ========== CONTACT FORM ==========
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'linear-gradient(135deg, #00c853, #00e676)';
      btn.disabled = true;

      setTimeout(() => {
        form.reset();
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        alert('Thanks for reaching out! We will get back to you soon.\\n\\n(Note: This is a demo form — connect to your email service for real submissions.)');
      }, 1500);
    });
  }
});

/* ============================================================
   TALEEM UL QURAN — Client-Side JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Navigation Toggle ----
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  let overlay = null;

  if (navToggle && navMenu) {
    // Create overlay
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('nav__menu--open');
      navToggle.setAttribute('aria-expanded', isOpen);
      overlay.classList.toggle('nav-overlay--open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    overlay.addEventListener('click', () => {
      navMenu.classList.remove('nav__menu--open');
      overlay.classList.remove('nav-overlay--open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav__menu--open');
        overlay.classList.remove('nav-overlay--open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Sticky Nav Shadow on Scroll ----
  const navHeader = document.getElementById('nav-header');
  if (navHeader) {
    window.addEventListener('scroll', () => {
      navHeader.classList.toggle('nav-header--scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ---- Scroll-based Fade-In Animations ----
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    fadeElements.forEach(el => el.classList.add('fade-in--visible'));
  }

  // ---- Toast Notification ----
  function showToast(message, type = 'success') {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger slide in
    requestAnimationFrame(() => {
      toast.classList.add('toast--show');
    });

    // Auto remove
    setTimeout(() => {
      toast.classList.remove('toast--show');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }

  // ---- Form Submission Handler ----
  function setupForm(formId, apiEndpoint) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      try {
        const res = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.success) {
          showToast(result.message, 'success');
          form.reset();
        } else {
          const errorMsg = result.errors
            ? result.errors.map(e => e.msg).join('. ')
            : result.message;
          showToast(errorMsg, 'error');
        }
      } catch (err) {
        showToast('Network error. Please check your connection and try again.', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Setup forms
  setupForm('contact-form', '/api/contact');
  setupForm('registration-form', '/api/register');
  setupForm('trial-registration-form', '/api/register');

});

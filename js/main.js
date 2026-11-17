/**
 * MAIN.JS - Core Interactivity, Navigation, ScrollSpy, Animations & Utilities
 * Author: Nishita G | Developer Portfolio
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Navbar Scroll Effect & Height Dynamics
  // -------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const floatingBackTop = document.querySelector('.floating-back-top');

  function handleWindowScroll() {
    const scrollY = window.scrollY;

    // Navbar blur background
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Floating Back to Top Button
    if (floatingBackTop) {
      if (scrollY > 400) {
        floatingBackTop.classList.add('visible');
      } else {
        floatingBackTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleWindowScroll, { passive: true });
  handleWindowScroll(); // Initial check

  // -------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle & Drawer
  // -------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileToggle) mobileToggle.classList.add('is-open');
    if (mobileNav) mobileNav.classList.add('is-open');
    if (mobileBackdrop) mobileBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileToggle) mobileToggle.classList.remove('is-open');
    if (mobileNav) mobileNav.classList.remove('is-open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // -------------------------------------------------------------------------
  // 3. ScrollSpy: Active Section Indicator
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const allMobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function updateActiveNavLink() {
    const scrollY = window.scrollY;
    const offset = 180; // Offset for navbar and breathing room

    let currentSectionId = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Default to 'hero' if at the very top
    if (scrollY < 100) {
      currentSectionId = 'hero';
    }

    // Update desktop links
    desktopNavLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    // Update mobile links
    allMobileNavLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // -------------------------------------------------------------------------
  // 4. Scroll-Triggered Reveal Animations
  // -------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: immediately show all elements if observer is unsupported
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // -------------------------------------------------------------------------
  // 5. Toast Notification System
  // -------------------------------------------------------------------------
  const toast = document.getElementById('toast-notice');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  window.showToast = function (message, duration = 3200) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, duration);
  };

  // -------------------------------------------------------------------------
  // 6. Copy to Clipboard Utility
  // -------------------------------------------------------------------------
  window.copyText = function (text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () {
        window.showToast(successMsg || 'Copied to clipboard!');
      }).catch(function () {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  function fallbackCopy(text, successMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      window.showToast(successMsg || 'Copied to clipboard!');
    } catch (err) {
      window.showToast('Unable to auto-copy. Text: ' + text);
    }
    document.body.removeChild(textArea);
  }

  // Copy Email button binding
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const email = this.getAttribute('data-email') || 'nishita.g.dev@example.com';
      window.copyText(email, 'Email address copied to clipboard!');
    });
  }

  // Placeholder Link Alert
  window.handlePlaceholderClick = function (e, platform) {
    e.preventDefault();
    window.showToast(`${platform} link placeholder! Update with your personal handle in index.html.`, 4000);
  };

  // -------------------------------------------------------------------------
  // 7. Contact Form Handling & Validation
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const subjectInput = document.getElementById('sender-subject');
      const messageInput = document.getElementById('sender-message');
      const submitBtn = document.getElementById('contact-submit-btn');

      // Simple validation
      if (!nameInput.value.trim()) {
        window.showToast('Please enter your name.');
        nameInput.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        window.showToast('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        window.showToast('Please enter a message of at least 10 characters.');
        messageInput.focus();
        return;
      }

      // Simulate sending state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="float-element">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 14 14"></polyline>
        </svg>
        Sending...
      `;

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Reset form
        contactForm.reset();

        // Success toast
        window.showToast('Thank you! Your message has been sent successfully.', 5000);
      }, 1000);
    });
  }

  // -------------------------------------------------------------------------
  // 8. Back to Top Smooth Scroll
  // -------------------------------------------------------------------------
  const backToTopButtons = document.querySelectorAll('.back-to-top-btn, .floating-back-top');
  backToTopButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  // -------------------------------------------------------------------------
  // 9. Initialize Lucide Icons (if loaded via CDN)
  // -------------------------------------------------------------------------
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
});

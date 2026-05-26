document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Control ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Get active theme from localStorage or default to system preference (preferring dark mode)
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    // System preference fallback
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'dark'; // We default to dark theme as recommended
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Initialize Theme
  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);

  // Toggle Theme Event
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // --- Header Scrolled Effect ---
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run initially to check status on reload

  // --- Mobile Drawer Menu ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('mobile-active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // Close mobile drawer when links are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('mobile-active');
      const icon = mobileToggle ? mobileToggle.querySelector('i') : null;
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });

  // --- Scroll Spy (Intersection Observer) ---
  const sections = document.querySelectorAll('section[id]');
  const spyOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the active scroll viewport area
    threshold: 0
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, spyOptions);

  sections.forEach(section => spyObserver.observe(section));

  // --- Scroll Reveal Animations (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before coming fully into view
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, revealOptions);

  revealElements.forEach(elem => revealObserver.observe(elem));
});

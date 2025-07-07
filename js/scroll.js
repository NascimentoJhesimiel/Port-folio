// Scroll Effects Module
class ScrollManager {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.body = document.body;
    this.init();
  }

  init() {
    this.bindScrollEvents();
    this.setupPreloader();
  }

  bindScrollEvents() {
    // Navbar background on scroll
    window.addEventListener("scroll", () => {
      this.updateNavbarOnScroll();
    });

    // Throttled scroll events for performance
    window.addEventListener(
      "scroll",
      this.throttle(() => {
        // Additional scroll handlers can be added here
      }, 16)
    ); // ~60fps
  }

  updateNavbarOnScroll() {
    const currentTheme = this.body.getAttribute("data-theme");
    const isLight = currentTheme === "light";

    if (window.scrollY > 100) {
      if (isLight) {
        this.navbar.style.background = "rgba(255, 255, 255, 0.98)";
        this.navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
      } else {
        this.navbar.style.background = "rgba(10, 10, 10, 0.98)";
        this.navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
      }
    } else {
      if (isLight) {
        this.navbar.style.background = "rgba(255, 255, 255, 0.95)";
        this.navbar.style.boxShadow = "none";
      } else {
        this.navbar.style.background = "rgba(10, 10, 10, 0.95)";
        this.navbar.style.boxShadow = "none";
      }
    }
  }

  setupPreloader() {
    // Preloader handling
    window.addEventListener("load", () => {
      // Hide preloader if exists
      const preloader = document.querySelector(".preloader");
      if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 500);
      }

      // Start animations
      document.body.classList.add("loaded");
    });
  }

  // Throttle function for performance optimization
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}

// Export for use in main script
window.ScrollManager = ScrollManager;

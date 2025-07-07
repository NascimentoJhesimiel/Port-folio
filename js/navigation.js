// Navigation Module
class NavigationManager {
  constructor() {
    this.hamburger = document.getElementById("hamburger");
    this.navMenu = document.getElementById("nav-menu");
    this.navClose = document.getElementById("nav-close");
    this.navOverlay = document.getElementById("nav-overlay");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupSmoothScrolling();
  }

  bindEvents() {
    // Hamburger menu toggle
    this.hamburger.addEventListener("click", () => {
      if (this.navMenu.classList.contains("active")) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    });

    // Close button
    this.navClose.addEventListener("click", () => this.closeMenu());

    // Overlay click
    this.navOverlay.addEventListener("click", () => this.closeMenu());

    // Navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });

    // ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.navMenu.classList.contains("active")) {
        this.closeMenu();
      }
    });
  }

  openMenu() {
    this.hamburger.classList.add("active");
    this.navMenu.classList.add("active");
    this.navOverlay.classList.add("active");
    document.body.classList.add("menu-open");
  }

  closeMenu() {
    this.hamburger.classList.remove("active");
    this.navMenu.classList.remove("active");
    this.navOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  setupSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }
}

// Export for use in main script
window.NavigationManager = NavigationManager;

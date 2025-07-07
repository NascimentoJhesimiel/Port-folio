// Theme Management Module
class ThemeManager {
  constructor() {
    this.themeSwitch = document.getElementById("theme-switch");
    this.body = document.body;
    this.init();
  }

  init() {
    // Check for saved theme or default to dark
    const currentTheme = localStorage.getItem("theme") || "dark";
    if (currentTheme === "light") {
      this.body.setAttribute("data-theme", "light");
      this.themeSwitch.classList.add("active");
    }

    // Bind events
    this.bindEvents();
  }

  bindEvents() {
    this.themeSwitch.addEventListener("click", () => {
      this.toggleTheme();
    });
  }

  toggleTheme() {
    const isLight = this.body.getAttribute("data-theme") === "light";

    if (isLight) {
      this.body.removeAttribute("data-theme");
      this.themeSwitch.classList.remove("active");
      localStorage.setItem("theme", "dark");
      this.updateNavbarBackground("dark");
    } else {
      this.body.setAttribute("data-theme", "light");
      this.themeSwitch.classList.add("active");
      localStorage.setItem("theme", "light");
      this.updateNavbarBackground("light");
    }
  }

  updateNavbarBackground(theme) {
    const navbar = document.querySelector(".navbar");
    if (theme === "light") {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
    }
  }
}

// Export for use in main script
window.ThemeManager = ThemeManager;

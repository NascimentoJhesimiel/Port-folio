// Main JavaScript File - Initializes all modules
class PortfolioApp {
  constructor() {
    this.modules = {};
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.initializeModules();
      });
    } else {
      this.initializeModules();
    }
  }

  initializeModules() {
    try {
      // Initialize all modules
      this.modules.theme = new ThemeManager();
      this.modules.navigation = new NavigationManager();
      this.modules.scroll = new ScrollManager();
      this.modules.animations = new AnimationManager();
      this.modules.projects = new ProjectsManager();
      this.modules.contact = new ContactManager();
      this.setupSkillsFilters();

      console.log("Portfolio modules initialized successfully");
    } catch (error) {
      console.error("Error initializing portfolio modules:", error);
    }
  }

  setupSkillsFilters() {
    const buttons = document.querySelectorAll(".skills-filter-btn");
    const categories = document.querySelectorAll(".skills .skill-category");

    if (!buttons.length || !categories.length) return;

    const applyFilter = (filter) => {
      categories.forEach((cat) => {
        const catType = cat.getAttribute("data-category");
        if (filter === "all" || catType === filter) {
          cat.style.display = "";
          cat.classList.remove("hidden");
          cat.classList.add("visible");
        } else {
          cat.style.display = "none";
          cat.classList.add("hidden");
          cat.classList.remove("visible");
        }
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-skill-filter");
        applyFilter(filter);
      });
    });

    // initial state: show frontend
    applyFilter("frontend");
  }

  // Public method to get specific module
  getModule(moduleName) {
    return this.modules[moduleName];
  }

  // Public method to reinitialize modules (useful for dynamic content)
  reinitialize() {
    this.initializeModules();
  }
}

// Initialize the application
const portfolioApp = new PortfolioApp();

// Make it globally available for debugging
window.portfolioApp = portfolioApp;

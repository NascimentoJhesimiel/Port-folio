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

      console.log("Portfolio modules initialized successfully");
    } catch (error) {
      console.error("Error initializing portfolio modules:", error);
    }
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

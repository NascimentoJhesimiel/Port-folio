// Projects Filter Module
class ProjectsManager {
  constructor() {
    this.filterButtons = document.querySelectorAll(".filter-btn");
    this.allProjectCards = document.querySelectorAll(".project-card");
    this.init();
  }

  init() {
    this.updateProjectCounts();
    this.initializeCards();
    this.bindEvents();
    this.addHoverEffects();
  }

  updateProjectCounts() {
    const counts = {
      all: this.allProjectCards.length,
      frontend: 0,
      backend: 0,
      fullstack: 0,
    };

    // Count projects by category
    this.allProjectCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (counts.hasOwnProperty(category)) {
        counts[category]++;
      }
    });

    // Update the count displays
    this.filterButtons.forEach((button) => {
      const filter = button.getAttribute("data-filter");
      const countSpan = button.querySelector(".project-count");
      if (countSpan && counts.hasOwnProperty(filter)) {
        countSpan.textContent = `(${counts[filter]})`;
      }
    });
  }

  initializeCards() {
    // Initialize all cards as visible
    this.allProjectCards.forEach((card) => {
      card.classList.add("visible");
      card.style.display = "block";
    });
  }

  bindEvents() {
    this.filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.handleFilterClick(button);
      });
    });
  }

  handleFilterClick(button) {
    // Remove active class from all buttons
    this.filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    this.allProjectCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (filterValue === "all" || cardCategory === filterValue) {
        card.classList.remove("hidden");
        card.classList.add("visible");
        // Animate in
        setTimeout(() => {
          card.style.display = "block";
        }, 10);
      } else {
        card.classList.add("hidden");
        card.classList.remove("visible");
        // Animate out
        setTimeout(() => {
          if (card.classList.contains("hidden")) {
            card.style.display = "none";
          }
        }, 300);
      }
    });
  }

  addHoverEffects() {
    this.allProjectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-15px) scale(1.02)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
      });
    });
  }
}

// Export for use in main script
window.ProjectsManager = ProjectsManager;

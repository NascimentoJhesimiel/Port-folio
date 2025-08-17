// Initialize AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: "ease-out-quart",
    anchorPlacement: "top-bottom",
  });
});

// Theme Switch
const themeSwitch = document.getElementById("theme-switch");
const body = document.body;

// Check for saved theme or default to dark
const currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "light") {
  body.setAttribute("data-theme", "light");
  themeSwitch.classList.add("active");
}

// Theme switch functionality
themeSwitch.addEventListener("click", () => {
  const isLight = body.getAttribute("data-theme") === "light";

  if (isLight) {
    body.removeAttribute("data-theme");
    themeSwitch.classList.remove("active");
    localStorage.setItem("theme", "dark");
    updateNavbarBackground("dark");
  } else {
    body.setAttribute("data-theme", "light");
    themeSwitch.classList.add("active");
    localStorage.setItem("theme", "light");
    updateNavbarBackground("light");
  }
});

// Update navbar background based on theme
function updateNavbarBackground(theme) {
  const navbar = document.querySelector(".navbar");
  if (theme === "light") {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
  }
}

// Mobile Navigation
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navClose = document.getElementById("nav-close");
const navOverlay = document.getElementById("nav-overlay");
const navLinks = document.querySelectorAll(".nav-link");

// Função para abrir o menu
function openMenu() {
  hamburger.classList.add("active");
  navMenu.classList.add("active");
  navOverlay.classList.add("active");
  document.body.classList.add("menu-open");
}

// Função para fechar o menu
function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  navOverlay.classList.remove("active");
  document.body.classList.remove("menu-open");
}

// Event listeners
hamburger.addEventListener("click", () => {
  if (navMenu.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
});

navClose.addEventListener("click", closeMenu);
navOverlay.addEventListener("click", closeMenu);

// Fechar menu ao clicar em um link
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Fechar menu com tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    closeMenu();
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const currentTheme = body.getAttribute("data-theme");
  const isLight = currentTheme === "light";

  if (window.scrollY > 100) {
    if (isLight) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
    }
  } else {
    if (isLight) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)";
      navbar.style.boxShadow = "none";
    }
  }
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Add fade-in class to elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".about, .skills, .projects, .contact"
  );
  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // Animate skill items
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Animate project cards
  const animatedProjectCards = document.querySelectorAll(".project-card");
  animatedProjectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
});

// Typing animation for hero subtitle
const subtitle = document.querySelector(".hero-subtitle");
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  setTimeout(typeWriter, 1000);
}

// Counter animation for stats
const counters = document.querySelectorAll(".stat-number");
const animateCounters = () => {
  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace("+", ""));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + "+";
        setTimeout(updateCounter, 30);
      } else {
        counter.textContent = target + "+";
      }
    };

    updateCounter();
  });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".about-stats");
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Contact form handling
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = "Mensagem Enviada!";
      submitBtn.style.background =
        "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background =
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        contactForm.reset();
      }, 2000);
    }, 1500);
  });
}

// Add hover effect to project cards
const hoverProjectCards = document.querySelectorAll(".project-card");
hoverProjectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Add click effect to buttons
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");
    this.appendChild(ripple);

    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect CSS
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Preloader (optional)
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

// Skills animation on hover
const skillItems = document.querySelectorAll(".skill-item");
skillItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const icon = item.querySelector("i");
    icon.style.transform = "scale(1.2) rotate(5deg)";
    icon.style.color = "#764ba2";
  });

  item.addEventListener("mouseleave", () => {
    const icon = item.querySelector("i");
    icon.style.transform = "scale(1) rotate(0deg)";
    icon.style.color = "#667eea";
  });
});

// Cursor trail effect (desktop only)
if (window.innerWidth > 768) {
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.4) 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
  document.body.appendChild(cursor);

  const animateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX - 10 + "px";
    cursor.style.top = cursorY - 10 + "px";
    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  // Hide cursor on interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .skill-item, .project-card"
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)";
      cursor.style.opacity = "0.5";
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
      cursor.style.opacity = "1";
    });
  });
}

// Active navigation link based on scroll position
const sections = document.querySelectorAll("section[id]");
const navLinksArray = Array.from(navLinks);

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinksArray.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Add active class style
const activeNavStyle = document.createElement("style");
activeNavStyle.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeNavStyle);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
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

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    // Your scroll event handlers here
  }, 16)
); // ~60fps

// Project Filters
const filterButtons = document.querySelectorAll(".filter-btn");
const allProjectCards = document.querySelectorAll(".project-card");

// Function to update project counts dynamically
function updateProjectCounts() {
  const counts = {
    all: allProjectCards.length,
    frontend: 0,
    backend: 0,
    fullstack: 0,
  };

  // Count projects by category
  allProjectCards.forEach((card) => {
    const category = card.getAttribute("data-category");
    if (counts.hasOwnProperty(category)) {
      counts[category]++;
    }
  });

  // Update the count displays
  filterButtons.forEach((button) => {
    const filter = button.getAttribute("data-filter");
    const countSpan = button.querySelector(".project-count");
    if (countSpan && counts.hasOwnProperty(filter)) {
      countSpan.textContent = `(${counts[filter]})`;
    }
  });
}

// Initialize project counts on page load
document.addEventListener("DOMContentLoaded", () => {
  updateProjectCounts();

  // Initialize all cards as visible
  allProjectCards.forEach((card) => {
    card.classList.add("visible");
    card.style.display = "block";
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    allProjectCards.forEach((card) => {
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
  });
});

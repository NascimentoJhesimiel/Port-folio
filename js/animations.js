// Animations Module
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.initAOS();
    this.setupScrollAnimations();
    this.setupTypingAnimation();
    this.setupParallax();
    this.setupSkillHoverEffects();
    this.setupButtonRippleEffect();
    this.setupCursorTrail();
  }

  initAOS() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-out-quart",
      anchorPlacement: "top-bottom",
    });
  }

  setupScrollAnimations() {
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
  }

  setupTypingAnimation() {
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
  }

  setupParallax() {
    // Parallax effect for hero section
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const heroContent = document.querySelector(".hero-content");
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }

  setupSkillHoverEffects() {
    // Skills animation on hover
    const skillItems = document.querySelectorAll(".skill-item");
    skillItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const icon = item.querySelector("i");
        icon.style.transform = "scale(1.2) rotate(5deg)";
        icon.style.color = "#3b82f6";
      });

      item.addEventListener("mouseleave", () => {
        const icon = item.querySelector("i");
        icon.style.transform = "scale(1) rotate(0deg)";
        icon.style.color = "#3b82f6";
      });
    });
  }

  setupButtonRippleEffect() {
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
  }

  setupCursorTrail() {
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
          background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(30, 64, 175, 0.4) 100%);
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
    }
  }
}

// Export for use in main script
window.AnimationManager = AnimationManager;

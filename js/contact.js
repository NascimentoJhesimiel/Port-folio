// Contact Form Module
class ContactManager {
  constructor() {
    this.contactForm = document.getElementById("contact-form");
    this.init();
  }

  init() {
    if (this.contactForm) {
      this.bindEvents();
    }
  }

  bindEvents() {
    this.contactForm.addEventListener("submit", (e) => {
      this.handleFormSubmission(e);
    });
  }

  handleFormSubmission(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this.contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Validate form data
    if (!this.validateForm(name, email, subject, message)) {
      return;
    }

    // Simulate form submission
    this.simulateSubmission();
  }

  validateForm(name, email, subject, message) {
    // Basic validation
    if (!name || !email || !subject || !message) {
      this.showMessage("Por favor, preencha todos os campos.", "error");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showMessage("Por favor, insira um email válido.", "error");
      return false;
    }

    return true;
  }

  simulateSubmission() {
    const submitBtn = this.contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    setTimeout(() => {
      // Show success state
      submitBtn.textContent = "Mensagem Enviada!";
      submitBtn.style.background =
        "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)";

      this.showMessage("Mensagem enviada com sucesso!", "success");

      setTimeout(() => {
        // Reset to original state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background =
          "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)";
        this.contactForm.reset();
      }, 2000);
    }, 1500);
  }

  showMessage(message, type) {
    // Create message element if it doesn't exist
    let messageElement = document.querySelector(".form-message");
    if (!messageElement) {
      messageElement = document.createElement("div");
      messageElement.className = "form-message";
      this.contactForm.appendChild(messageElement);
    }

    // Set message content and style
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    messageElement.style.cssText = `
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 5px;
      text-align: center;
      font-weight: 500;
      ${
        type === "success"
          ? "background: rgba(39, 174, 96, 0.1); color: #27ae60; border: 1px solid rgba(39, 174, 96, 0.3);"
          : "background: rgba(231, 76, 60, 0.1); color: #e74c3c; border: 1px solid rgba(231, 76, 60, 0.3);"
      }
    `;

    // Remove message after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  }
}

// Export for use in main script
window.ContactManager = ContactManager;

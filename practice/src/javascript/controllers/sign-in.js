export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    document.addEventListener("DOMContentLoaded", () => {
      this.setupEventListeners();
    });
  }

  setupEventListeners() {
    const passwordInput = document.getElementById("password");
    const showPasswordIcon = document.querySelector(".show-password");
    const form = document.querySelector(".form__wrapper");

    showPasswordIcon.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPasswordIcon.textContent = "👁️‍🗨️"; // Icon when displaying password
      } else {
        passwordInput.type = "password";
        showPasswordIcon.textContent = "🔒"; // Icon when hiding password
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");

      let isValid = true;

      // Perform validation for email
      if (!this.model.validateEmail(emailInput.value)) {
        this.view.showError(emailInput, "Please enter a valid email");
        isValid = false;
      } else {
        this.view.hideError(emailInput);
      }

      // Perform validation for password
      if (!this.model.validatePasswordLength(passwordInput.value, 8)) {
        this.view.showError(passwordInput, "Password must be at least 8 characters");
        isValid = false;
      } else {
        this.view.hideError(passwordInput);
      }

      if (isValid) {
        window.location.href = "index.html";
      }
    });
  }
}


document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const showPasswordIcon = document.querySelector(".show-password");
  const form = document.querySelector(".form__wrapper");

  showPasswordIcon.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      showPasswordIcon.textContent = "👁️‍🗨️"; // Icon when displaying password
    } else {
      passwordInput.type = "password";
      showPasswordIcon.textContent = "🔒"; // Icon when hiding password
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    let isValid = true;

    // Perform validation for email
    if (!Validator.isEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email");
      isValid = false;
    } else {
      hideError(emailInput);
    }

    // Perform validation for password
    if (!Validator.minLength(passwordInput.value, 8)) {
      showError(passwordInput, "Password must be at least 8 characters");
      isValid = false;
    } else {
      hideError(passwordInput);
    }

    if (isValid) {
      window.location.href = "index.html";
    }
  });
});

// Function to show error message
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".form__message");
  errorMessage.textContent = message;
  formGroup.classList.add("invalid");
}

// Function to hide error message
function hideError(input) {
  const formGroup = input.parentElement;
  formGroup.classList.remove("invalid");
  formGroup.querySelector(".form__message").textContent = "";
}

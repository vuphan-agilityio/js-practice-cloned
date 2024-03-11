export default class View {
  constructor() {
  }

  showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector(".form__message");
    errorMessage.textContent = message;
    formGroup.classList.add("invalid");
  }

  hideError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove("invalid");
    formGroup.querySelector(".form__message").textContent = "";
  }
}

import { bindEvent } from "../helpers";

export default class AuthenticationView {
  constructor() {
    this.signInFormEl = document.getElementById("form-sign-in");
    this.signUpFormEl = document.getElementById("form-sign-up");
    this.emailEl = document.getElementById("email");
    this.passwordEl = document.getElementById("password");
    this.userNameEl = document.getElementById("username");
    this.passwordConfirmEl = document.getElementById("confirmPassword");
    this.idUserEl = document.getElementById("id-user");
  }

  /**
   * The bindCallback function binds events to corresponding handlers on HTML elements in the user interface.
   * @param {string} event - Event name to attach.
   * @param {function} handler - The handler function is called when the event occurs.
   */
  bindCallback = (event, handler) => {
    switch (event) {
      case "signIn":
        bindEvent(this.signInFormEl, "submit", this.signIn(handler));
        break;
      case "signUp":
        bindEvent(this.signUpFormEl, "submit", this.signUp(handler));
        break;
      default:
        break;
    }
  };

  /**
   * The signIn function handles the login event on the user interface.
   * @param {function} handler - Function to handle when the login event is triggered.
   * @returns {function} - A login event handler function.
   */
  signIn = (handler) => {
    return (event) => {
      event.preventDefault();
      const emailEl = document.getElementById("email");
      const passwordEl = document.getElementById("password");
      handler(emailEl.value, passwordEl.value);
    };
  };

  /**
   * The redirectPage function redirects the website to another page.
   * @param {string} page - URL of the page you want to redirect to.
   */
  redirectPage = (page) => {
    window.location.replace(page);
  };
  // showProductById = (handler) => (event) => {
  //   const productId = event.target.closest(".table__row").dataset.id;
  //   handler(productId);
  // };

  /**
   * The signUp function handles the user registration event on the user interface.
   * @param {function} handler - Function to handle when the signUp event is triggered.
   * @returns {function} - A function that handles the submit event when registering a user.
   */
  signUp = (handler) => {
    return (event) => {
      event.preventDefault();
      const emailEl = document.getElementById("email");
      const passwordEl = document.getElementById("password");
      handler({
        email: emailEl.value,
        username: this.userNameEl.value,
        password: passwordEl.value,
        passwordConfirm: this.passwordConfirmEl.value,
      });
    };
  };
}

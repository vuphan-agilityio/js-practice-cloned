import { bindEvent } from "../helpers";

export default class UserView {
  constructor() {
    this.signInFormEl = document.getElementById("form-sign-in");
    this.signUpFormEl = document.getElementById("form-sign-up");
    this.emailEl = document.getElementById("email");
    this.passwordEl = document.getElementById("password");
    this.userNameEl = document.getElementById("username");
    this.passwordConfirmEl = document.getElementById("confirmPassword");
  }

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

  signIn = (handler) => {
    return (event) => {
      event.preventDefault();
      handler(this.emailEl.value, this.passwordEl.value);
    };
  };

  redirectPage = (page) => {
    window.location.replace(page);
  };

  signUp = (handler) => {
    return (event) => {
      event.preventDefault();
      handler({
        email: this.emailEl.value,
        username: this.userNameEl.value,
        password: this.passwordEl.value,
        passwordConfirm: this.passwordConfirmEl.value,
      });
    };
  };
}

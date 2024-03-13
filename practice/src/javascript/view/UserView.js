import { bindEvent } from "../helpers";

export default class UserView {
  constructor() {
    this.signInFormEl = document.getElementById("form-sign-in");
    this.signUpFormEl = document.getElementById("form-sign-up");
    this.emailEl = document.getElementById("email");
    this.pwdEl = document.getElementById("password");
    this.emailRgtEl = document.getElementById("emailRegister");
    this.nameEl = document.getElementById("username");
    this.pwdRgtEl = document.getElementById("passwordRegister");
    this.confirmPwdEl = document.getElementById("confirmPassword");
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
      handler(this.emailEl.value, this.pwdEl.value);
    };
  };

  redirectPage = (page) => {
    console.log("page", page);
    window.location.replace(page);
  };

  signUp = (handler) => {
    return (event) => {
      event.preventDefault();
      handler(
        this.emailRgtEl.value,
        this.nameEl.value,
        this.pwdRgtEl.value,
        this.confirmPwdEl.value
      );
    };
  };
}

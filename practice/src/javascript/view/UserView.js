import { bindEvent } from "../helpers";

export default class UserView {
  constructor() {
    this.signInFormEl = document.getElementById("form-sign-in");
    this.emailEl = document.getElementById("email");
    this.pwdEl = document.getElementById("password");
    this.nameEl = document.getElementById("username");
    this.comfirmPwdEl = document.getElementById("password-comfim")

  }

  bindCallback = (event, handler) => {
    switch (event) {
      case "signIn":
        bindEvent(this.signInFormEl, "submit", this.signIn(handler));
        break;
      case "signUp":
        this.bindCallback(this.signUp, "submit", this.signUp(handler));
        break;
    }
  };

  signIn = (handler) => {
    return (event) => {
      event.preventDefault();
      handler(this.emailEl.value, this.pwdEl.value);
    };
  };

  redirectPage = () => {
    window.location.replace(`/home`);
  };

  signUp = (handler) => {
    return (event) => {
      event.preventDefault();
      handler(this.emailEl.value, this.pwdEl.value, this.nameEl.value, this.comfirmPwdEl.value);
    };
  };

  redirectPage = () => {
    window.location.replace(`/logIn`);
  };
}

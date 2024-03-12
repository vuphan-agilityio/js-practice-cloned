import { bindEvent } from "../helpers";

export default class UserView {
  constructor() {
    this.signInFormEl = document.getElementById("form-sign-in");
    this.emailEl = document.getElementById("email");
    this.pwdEl = document.getElementById("password");
  }

  bindCallback = (event, handler) => {
    switch (event) {
      case "signIn":
        bindEvent(this.signInFormEl, "submit", this.signIn(handler));
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
    window.location.replace(`http://localhost:1234/${page}`);
  };
}

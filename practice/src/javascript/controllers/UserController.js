
export default class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init = () => {
    this.view.bindCallback("signIn", this.signIn);
  };

  signIn = (email, password) => {
    const result = this.model.signIn(email, password);
    // console.log("email:", email);
    // console.log("pass:", password);

    if (result) {
      this.view.redirectPage("index.html");
    } else {
      alert("Invalid email or password. Please try again.");
      // console.log("false")
    }
  };
}

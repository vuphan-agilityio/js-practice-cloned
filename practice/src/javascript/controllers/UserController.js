export default class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init = () => {
    this.view.bindCallback("signIn", this.signIn);
    this.view.bindCallback("signUp", this.signUp);
  };

  signIn = (email, password) => {
    const result = this.model.signIn(email, password);

    if (result) {
      this.view.redirectPage("index.html");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  signUp = (email, username, password, confirmPassword) => {
    const result = this.model.signUp(
      email,
      username,
      password,
      confirmPassword
    );

    // if (result.success) {
    //   alert("Sign up successful.");
    //   this.view.redirectPage();
    // } else {
    //   alert(result.message);
    // }
    // console.log("email:", email);
    // console.log("username:", password);
    // console.log("pass:", password);
    // console.log("comfirm-pass:", password);
  };
}

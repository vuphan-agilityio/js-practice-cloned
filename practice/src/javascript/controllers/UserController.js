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

  signUp = (emailRegister, username, passwordRegister, confirmPassword) => {
    const signUpResult = this.model.signUp(
      emailRegister,
      username,
      passwordRegister,
      confirmPassword
    );

    if (signUpResult) {
      this.view.redirectPage("login.html");
    } else {
      if (!this.model.validateEmail(emailRegister)) {
        alert("Please enter a valid email address.");
      } else if (!this.model.validateUsernameLength(username, 2)) {
        alert("Username must be at least 2 characters long.");
      } else if (!this.model.validatePasswordLength(passwordRegister, 8)) {
        alert("Password must be at least 8 characters long.");
      } else if (passwordRegister !== confirmPassword) {
        alert("Password and Confirm Password do not match.");
      } else if (this.model.isUserExists(emailRegister)) {
        alert("Email is already registered.");
      }
    }
  };
}

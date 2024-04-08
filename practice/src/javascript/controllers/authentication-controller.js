import AuthenticationService from "../services/authentication-service.js";
import { inValidEmail, inValidUsername, inValidPassword } from "../helpers/index.js";

export default class AuthenticationController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init = async () => {
    this.view.bindCallback("signIn", this.handleSignIn);
    this.view.bindCallback("signUp", this.signUp);
  };

   /**
   * Function to perform signIn during the login process.
   * @param {string} email - User's email address.
   * @param password {string} - User's password.
   */
   handleSignIn = async (email, password) => {
    const user = await AuthenticationService.signIn(email, password);

    localStorage.setItem("user",user)
    if (user.role === "admin") {
      this.view.redirectPage("dashboard.html");
    } else if (user.role === "user") {
      this.view.redirectPage("index.html");

    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  /**
   * The signUp function performs the new user registration process.
   * @param {object} userData - New user information including email, username, password, and passwordConfirm.
   */
  signUp = async ({ email, username, password, passwordConfirm }) => {
    const role = "user";

    if (!inValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!inValidUsername(username, 2)) {
      alert("Username must be at least 2 characters long.");
      return;
    }

    if (!inValidPassword(password, 8)) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    const isExits = await AuthenticationService.findUserByEmail(email);

    if (isExits) {
      alert("Email is already registered.");
      return;
    }

    await AuthenticationService.createUser({
      email,
      username,
      password,
      passwordConfirm,
      role,
    });

    if (!response.error) {
      this.view.redirectPage("login.html");
    } else {
      alert("Something went wrong!");
    }
  };

  /**
   * The findUserByEmail function checks whether an email address exists in the system or not.
   * @param {string} email - Email address to check.
   * @returns {boolean} - Returns true if the email address already exists in the system, otherwise returns false.
   */
  findUserByEmail = async (email) => {
    const { result } = await AuthenticationService.findUserByEmail(email);
    return !!result?.length;
  };

  /**
   * The signIn function performs user authentication using email address and password.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {boolean} - Returns true if authentication is successful, false otherwise.
   */
  signIn = async (email, password) => {
    const { result } = await AuthenticationService.signIn(email, password);
    return !!result?.length;
  };
}

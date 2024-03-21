import UserService from "../services/user.js";

import {
  inValidEmail,
  inValidUsername,
  inValidPassword
} from "../helpers";

export default class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init = () => {
    this.view.bindCallback("signIn", this.signIn);
    this.view.bindCallback("signUp", this.signUp);
    this.view.bindCallback("menuToggle");
    this.view.bindCallback("newToggle");
    this.view.bindCallback("closeToggle");
    this.view.bindCallback("userToggle");
    this.view.bindCallback("productToggle");
    this.handleGetUsers();
    this.handleGetProduct();
  };

  signIn = async (email, password) => {
    const result = await this.model.signIn(email, password);

    if (result) {
      this.view.redirectPage("index.html");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  // Get data user
  handleGetUsers = async () => {
    const { users }  = await this.getUsers();
    this.model.setUsers(users);
    this.view.renderTables(users);
}

  // Get data UserService
  getUsers = async () => {
    return await UserService.fetchUsers();
  }

  // Get data product
  handleGetProduct = async () => {
    const { product } = await this.getProduct();
    this.model.setProduct(product);
    this.view.renderTableProduct(product);
  }

  getProduct = async () => {
    return await UserService.fetchProduct();
  }

  signUp = async ({ email, username, password, passwordConfirm }) => {
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

    const isExits = await this.model.findUserByEmail(email);

    if (isExits) {
      alert("Email is already registered.");
      return;
    }

    const response = this.model.createUser({
      email,
      username,
      password,
      passwordConfirm,
    });

    if (!response.error) {
      this.view.redirectPage("login.html");
    } else {
      alert("Something went wrong!");
    }
  };

  findUserByEmail = async (email) => {
    const { result } = await UserService.findUserByEmail(email);

    return !!result?.length;
  };

  signIn = async (email, password) => {
    const { result } = await UserService.signIn(email, password);

    return !!result?.length;
  };

  createUser = async ({ email, username, password, passwordConfirm }) => {
    const response = await UserService.createUser({
      email,
      username,
      password,
      passwordConfirm,
    });

    console.log("response", response);
  };
}

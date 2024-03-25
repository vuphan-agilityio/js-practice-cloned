import UserService from "../services/user.js";

import { inValidEmail, inValidUsername, inValidPassword } from "../helpers";

export default class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init = async () => {
    this.view.bindCallback("signIn", this.signIn);
    this.view.bindCallback("signUp", this.signUp);
    this.view.bindCallback("menuToggle");
    this.view.bindCallback("newToggle");
    this.view.bindCallback("closeToggle");
    this.view.bindCallback("navigationItem", this.handlerViewTable);
    this.view.bindCallback("editUsers", this.handerEditusers);
    this.view.bindCallback(this.handleClickUser);

    this.urlParams = new URLSearchParams(window.location.search);

    if (this.urlParams.get("nav") === "products") {
      this.handleViewProducts();
      this.view.setNavigationActive("products");
    } else {
      await this.handleViewUsers();
      this.view.setNavigationActive("users");
    }

    this.view.bindCallback("displayPanel");
    this.view.bindCallback("addProduct", this.handleAddProduct);
  };

  signIn = async (email, password) => {
    const result = await this.model.signIn(email, password);

    if (result) {
      this.view.redirectPage("index.html");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  handleViewUsers = async () => {
    const { data } = await this.getUsers();
    this.model.setUsers(data);
    this.view.renderTables(data);
    this.view.bindCallback("userRowClick", this.handleShowUserDetails);
  };

  handleShowUserDetails = (userId) => {
    console.log("handleShowUserDetails Test", userId);
    const user = this.model.getUserById(userId);
    this.view.showUserDetails({
      username: user.username,
      email: user.email
    })
  }

  // Get data UserService
  getUsers = async () => {
    return await UserService.fetchUsers();
  };

  // Get data product
  handleViewProducts = async () => {
    const { data } = await this.getProducts();
    this.model.setProducts(data);
    this.view.renderTableProducts(data);
  };

  // Edit user
  handerEditusers = async (userData) => {
    const res = await this.model.handerEditusers();
  };

  editUsers = async (username) => {
    const res = await this.UserService.editUsers();
  };

  //Get data for produt to the UserService
  getProducts = async () => {
    return await UserService.fetchProducts();
  };

  handlerViewTable = (type) => {
    switch (type) {
      case "users":
        this.handleViewUsers();
        break;
      case "products":
        this.handleViewProducts();
        break;
      default:
        break;
    }
  };

  // Valiation for sign up
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
  };
}

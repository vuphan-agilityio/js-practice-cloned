import UserService from "../services/user.js";

import { inValidEmail, inValidUsername, inValidPassword } from "../helpers";

export default class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init = async () => {
    this.view.bindCallback("signIn", this.handleSignIn);
    this.view.bindCallback("signUp", this.signUp);
    this.view.bindCallback("menuToggle");
    this.view.bindCallback("newToggle");
    this.view.bindCallback("closeToggle");
    this.view.bindCallback("navigationItem", this.handlerViewTable);
    this.view.bindCallback("editUser", this.handleEditUser);
    this.view.bindCallback("deleteUser", this.handleDeleteUser);
    this.view.bindCallback("editProduct", this.handleEditProduct)
    this.view.bindCallback("deleteProduct", this.handleDeleteProduct)

    this.urlParams = new URLSearchParams(window.location.search);

    if (this.urlParams.get("nav") === "products") {
      this.handleViewProducts();
      this.view.setNavigationActive("products");
    } else if (this.urlParams.get("nav") === "users") {
      console.log("handle user");
      await this.handleViewUsers();
      this.view.setNavigationActive("users");
    }

    this.view.bindCallback("displayPanel");
    this.view.bindCallback("addProduct", this.handleAddProduct);
    this.view.bindCallback("backToggle");
  };

  /**
   * Function to perform signIn during the login process.
   * @param {string} email - User's email address.
   * @param password {string} - User's password.
   */
  handleSignIn = async (email, password) => {
    const user = await UserService.signIn(email, password);

    localStorage.setItem("user",user)
    if (user.role === "admin") {
      this.view.redirectPage("user-manager.html");
    } else if (user.role === "user") {
      this.view.redirectPage("index.html");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  /**
   * The handleEditUser function performs the process of editing user information.
   * @param {string} userId - ID of the user to edit.
   * @param {string} newUsername - New username.
   */
  handleEditUser = async (userId, newUsername) => {
    try {
      if (!newUsername) {
        alert("Username cannot be empty!");
        return;
      }
      const user = this.model.getUserById(userId);
      await UserService.editUsers(userId, { ...user, username: newUsername });
      alert("Username updated successfully!");
      this.handleViewUsers();
    } catch (error) {
      alert("Failed to update user");
    }
  };

  handleEditProduct = async (productImage, productName, productId) => {
    try {
      const product = this.model.getProductById(productId);
      await UserService.editProduct(productId, { ...product, name: productName, imageUrl: productImage });
      alert("Username updated successfully!");
      this.handleViewProducts();
    } catch (error) {
      alert("Failed to update user");
    }
  }

  /**
   * The handleDeleteUser function initiates the deletion of a user from the server and updates the UI accordingly.
   * @param {string} userId - The ID of the user to be deleted.
   */
  handleDeleteUser = async (userId) => {
    const user = this.model.getUserById(userId);
    await UserService.deleteUser(userId, { ...user });
    alert("Delete successfully!");
    this.handleViewUsers();
  };

  handleDeleteProduct = async (productId) => {
    await UserService.deleteProduct(productId);
    alert("Delete successfully!");
    this.handleViewProducts();
  };

  /**
   * The handleViewUsers function displaying the list of users.
   */
  handleViewUsers = async () => {
    const { data } = await this.getUsers();
    this.model.setUsers(data);
    this.view.renderTables(data);
    this.view.bindCallback("userRowClick", this.handleShowUserDetails);
  };

  /**
   * The handleShowUserDetails function displays details of a user.
   * @param {string} userId - ID of the user to display details.
   */
  handleShowUserDetails = (userId) => {
    const user = this.model.getUserById(userId);
    this.view.showUserDetails(user);
  };

  /**
   * The getUsers function retrieves a list of users from the server through UserService.
   * @returns {Promise} - A Promise containing user list data from the server.
   */
  getUsers = async () => {
    return await UserService.fetchUsers();
  };

  /**
   * The handleViewProducts function displays the product list on the interface.
   */
  handleViewProducts = async () => {
    const { data } = await this.getProducts();
    this.model.setProducts(data);
    this.view.renderTableProducts(data);
    this.view.bindCallback("productRowClick", this.handleShowProductDetails);
  };

  handleShowProductDetails = (productId) => {
    const product = this.model.getProductById(productId);
    this.view.showProductDetails(product);
  };

  /**
   * The getProducts function retrieves a list of products from the server through UserService.
   *
   * @returns {Promise} - A Promise containing product list data from the server.
   */
  getProducts = async () => {
    return await UserService.fetchProducts();
  };

  /**
   * The handlerViewTable function displays the corresponding data table (user or product) on the interface.
   * @param {string} type - The type of data to display ("users" or "products").
   */
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

    const isExits = await UserService.findUserByEmail(email);

    if (isExits) {
      alert("Email is already registered.");
      return;
    }

    await UserService.createUser({
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
    const { result } = await UserService.findUserByEmail(email);
    return !!result?.length;
  };

  /**
   * The signIn function performs user authentication using email address and password.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {boolean} - Returns true if authentication is successful, false otherwise.
   */
  signIn = async (email, password) => {
    const { result } = await UserService.signIn(email, password);
    return !!result?.length;
  };

  // createUser = async ({ email, username, password, passwordConfirm }) => {
  //   const response = await UserService.createUser({
  //     email,
  //     username,
  //     password,
  //     passwordConfirm,
  //   });
  // };

  handleAddProduct = async ({name, image, category, creator, ratings, description, instruction, ingredients, nutrition}) => {
    await UserService.createProduct({name, image, category, creator, ratings, description, instruction, ingredients, nutrition})
    this.handleViewProducts()
  }

}

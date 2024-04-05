import UserService from "../services/user.js";

import { inValidEmail, inValidUsername, inValidPassword } from "../helpers/index.js";

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
    this.view.bindCallback("editUser", this.handleEditUser);
    this.view.bindCallback("deleteUser", this.handleDeleteUser);
    // this.view.bindCallback("editRecipe", this.handleEditRecipe);
    // this.view.bindCallback("deleteRecipe", this.handleDeleteRecipe);


    this.urlParams = new URLSearchParams(window.location.search);

    if (this.urlParams.get("nav") === "recipes") {
      this.handleViewRecipes();
      this.view.setNavigationActive("recipes");
    } else if (this.urlParams.get("nav") === "users") {
      console.log("handle user");
      await this.handleViewUsers();
      this.view.setNavigationActive("users");
    }

    this.view.bindCallback("displayPanel");
    // this.view.bindCallback("addRecipe", this.handleAddRecipe);
    this.view.bindCallback("backToggle");
  };

  // /**
  //  * Function to perform signIn during the login process.
  //  * @param {string} email - User's email address.
  //  * @param password {string} - User's password.
  //  */
  // handleSignIn = async (email, password) => {
  //   const user = await UserService.signIn(email, password);

  //   localStorage.setItem("user",user)
  //   if (user.role === "admin") {
  //     this.view.redirectPage("dashboard.html");
  //   } else if (user.role === "user") {
  //     this.view.redirectPage("index.html");
  //     this.view.renderRecipeHomeTemplate;

  //   } else {
  //     alert("Invalid email or password. Please try again.");
  //   }
  // };

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

  // handleEditRecipe = async (recipeImage, recipeName, recipeId) => {
  //   try {
  //     const recipe = this.model.getRecipeById(recipeId);
  //     await UserService.editRecipe(recipeId, { ...recipe, name: recipeName, imageUrl: recipeImage });
  //     alert("Username updated successfully!");
  //     this.handleViewRecipes();
  //   } catch (error) {
  //     alert("Failed to update user");
  //   }
  // }

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

  // handleDeleteRecipe = async (recipesId) => {
  //   await UserService.deleteRecipe(recipeId);
  //   alert("Delete successfully!");
  //   this.handleViewRecipes();
  // };

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

  // /**
  //  * The handleViewRecipes function displays the recipes list on the interface.
  //  */
  handleViewRecipes = async () => {
    // const { data } = await this.getRecipes();
    // this.model.setRecipes(data);
    // this.view.renderTableRecipes(data);
    // this.view.bindCallback("recipeRowClick", this.handleShowRecipeDetails);
  };

  // handleShowRecipeDetails = (recipesId) => {
  //   const recipes = this.model.getRecipeById(recipesId);
  //   this.view.showRecipeDetails(recipes);
  // };

  // handleViewRecipeHome = async () => {
  //   const { data } = await this.getRecipes();
  //   this.model.setRecipes(data);
  //   this.view.renderRecipeHomeTemplate(data);
  //   console.log("data-controller", data)
  // }

  // /**
  //  * The getRecipes function retrieves a list of recipes from the server through UserService.
  //  *
  //  * @returns {Promise} - A Promise containing recipe list data from the server.
  //  */
  // getRecipes = async () => {
  //   return await UserService.fetchRecipes();
  // };

  // /**
  //  * The signUp function performs the new user registration process.
  //  * @param {object} userData - New user information including email, username, password, and passwordConfirm.
  //  */
  // signUp = async ({ email, username, password, passwordConfirm }) => {
  //   const role = "user";

  //   if (!inValidEmail(email)) {
  //     alert("Please enter a valid email address.");
  //     return;
  //   }

  //   if (!inValidUsername(username, 2)) {
  //     alert("Username must be at least 2 characters long.");
  //     return;
  //   }

  //   if (!inValidPassword(password, 8)) {
  //     alert("Password must be at least 8 characters long.");
  //     return;
  //   }

  //   if (password !== passwordConfirm) {
  //     alert("Password and Confirm Password do not match.");
  //     return;
  //   }

  //   const isExits = await UserService.findUserByEmail(email);

  //   if (isExits) {
  //     alert("Email is already registered.");
  //     return;
  //   }

  //   await UserService.createUser({
  //     email,
  //     username,
  //     password,
  //     passwordConfirm,
  //     role,
  //   });

  //   if (!response.error) {
  //     this.view.redirectPage("login.html");
  //   } else {
  //     alert("Something went wrong!");
  //   }
  // };

  // /**
  //  * The findUserByEmail function checks whether an email address exists in the system or not.
  //  * @param {string} email - Email address to check.
  //  * @returns {boolean} - Returns true if the email address already exists in the system, otherwise returns false.
  //  */
  // findUserByEmail = async (email) => {
  //   const { result } = await UserService.findUserByEmail(email);
  //   return !!result?.length;
  // };

  // /**
  //  * The signIn function performs user authentication using email address and password.
  //  * @param {string} email - User's email address.
  //  * @param {string} password - User's password.
  //  * @returns {boolean} - Returns true if authentication is successful, false otherwise.
  //  */
  // signIn = async (email, password) => {
  //   const { result } = await UserService.signIn(email, password);
  //   return !!result?.length;
  // };

  // createUser = async ({ email, username, password, passwordConfirm }) => {
  //   const response = await UserService.createUser({
  //     email,
  //     username,
  //     password,
  //     passwordConfirm,
  //   });
  // };

  // handleAddRecipe = async ({name, image, category, creator, ratings, description, instruction, ingredients, nutrition}) => {
  //   await UserService.createRecipe({name, image, category, creator, ratings, description, instruction, ingredients, nutrition})
  //   this.handleViewRecipes()
  // }

}

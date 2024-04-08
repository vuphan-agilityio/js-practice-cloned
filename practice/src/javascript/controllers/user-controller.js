import UserService from "../services/user.js";

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

    this.urlParams = new URLSearchParams(window.location.search);

    if (this.urlParams.get("nav") === "recipes") {
      this.handleViewRecipes();
      this.view.setNavigationActive("recipes");
    } else if (this.urlParams.get("nav") === "users") {
      await this.handleViewUsers();
      this.view.setNavigationActive("users");
    }

    this.view.bindCallback("displayPanel");
    this.view.bindCallback("backToggle");
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

  /**
   * The handleDeleteUser function initiates the deletion of a user from the server and updates the UI accordingly.
   * @param {string} userId - The ID of the user to be deleted.
   */
  handleDeleteUser = async (userId) => {
    const user = this.model.getUserById(userId);
    await UserService.deleteUser(userId, { ...user });
    alert("Delete user successfully!");
    this.handleViewUsers();
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

  // /**
  //  * The handleViewRecipes function displays the recipes list on the interface.
  //  */
  handleViewRecipes = async () => {
    // const { data } = await this.getRecipes();
    // this.model.setRecipes(data);
    // this.view.renderTableRecipes(data);
    // this.view.bindCallback("recipeRowClick", this.handleShowRecipeDetails);
  };
}

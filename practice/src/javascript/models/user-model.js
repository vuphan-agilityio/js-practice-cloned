export default class UserModel {
  constructor(
    email,
    password,
    emailRegister,
    username,
    passwordRegister,
    confirmPassword,
    name,

    // description,
    // ingredients,
    // intruction,
    // nutrition,
    // creator,
    // category,
    // id,
    // role,
    // imageURL,
    // ratings
  ) {
    this.email = email;
    this.password = password;
    this.emailRegister = emailRegister;
    this.username = username;
    this.passwordRegister = passwordRegister;
    this.confirmPassword = confirmPassword;
    this.users = [];
    this.recipes = [];
    this.name = name;
    // this.description = description;
    // this.ingredients = ingredients;
    // this.intruction = intruction;
    // this.nutrition = nutrition;
    // this.creator = creator;
    // this.category = category;
    // this.id = id;
    // this.role = role;
    // this.imageURL = imageURL;
    // this.ratings = ratings;
  }

  /**
   * The setUsers function updates user data in the application model.
   * @param {array} data - An array containing person data
   */
  setUsers = (data) => {
    this.users = data;
  };

  /**
   * The getUserById function gets information about a user based on their ID from the user data in the application model.
   * @param {string} id - ID of the user to get information from.
   * @returns {object|undefined} - Returns information about the user with the corresponding ID, or undefined if not found.
   */
  getUserById = (id) => {
    return this.users.find((user) => user.id === id);
  };

  // /**
  //  * The setRecipes function updates recipe data in the application model.
  //  * @param {array} data - An array containing new recipe data
  //  */
  // setRecipes = (data) => {
  //   this.recipes = data;
  // };

  // getRecipeById = (id) => {
  //   return this.recipes.find((recipe) => recipe.id === id);
  // };
}

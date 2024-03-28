export default class UserModel {
  constructor(
    email,
    password,
    emailRegister,
    username,
    passwordRegister,
    confirmPassword,
    name,
    description,
    ingredients,
    intruction,
    nutrition,
    creator,
    category,
    id
  ) {
    this.email = email;
    this.password = password;
    this.emailRegister = emailRegister;
    this.username = username;
    this.passwordRegister = passwordRegister;
    this.confirmPassword = confirmPassword;
    this.users = [];
    this.products = [];
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.intruction = intruction;
    this.nutrition = nutrition;
    this.creator = creator;
    this.category = category;
    this.id = id;
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

  /**
   * The setProducts function updates product data in the application model.
   * @param {array} data - An array containing new product data
   */
  setProducts = (data) => {
    this.products = data;
  };
}

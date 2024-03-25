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
    id,
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

  setUsers = (data) => {
    this.users = data;
  }

  getUserById = (id) => {
    return this.users.find((user) => user.id === id);
  }

  setProducts = (data) => {
    this.products = data;
  }
}

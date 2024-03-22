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
  }

  setUsers = (data) => {
    this.users = data;
  }

  setProducts = (data) => {
    this.products = data;
  }
}

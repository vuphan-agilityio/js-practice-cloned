import UserService from "../services/user.js";

export default class UserModel {
  constructor(
    email,
    password,
    emailRegister,
    username,
    passwordRegister,
    confirmPassword
  ) {
    this.email = email;
    this.password = password;
    this.emailRegister = emailRegister;
    this.username = username;
    this.passwordRegister = passwordRegister;
    this.confirmPassword = confirmPassword;
    this.users = [];
  }

  findUserByEmail = async (email) => {
    const { result } = await UserService.findUserByEmail(email);

    return !!result?.length;
  };

  signIn = async (email, password) => {
    const { result } = await UserService.signIn(email, password);

    return !!result?.length;
  }

  createUser = async ({ email, username, password, passwordConfirm }) => {

    const response = await UserService.createUser({
      email,
      username,
      password,
      passwordConfirm,
    });

    console.log('response', response)
  };
}

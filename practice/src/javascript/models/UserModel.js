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

  signIn = (email, password) => {
    const users = [
      { email: "user1@example.com", password: "password1" },
      { email: "user2@example.com", password: "password2" },
      { email: "user@example.com", password: "12345678" },
    ];

    const user = users.find(
      (item) => item.email === email && item.password === password
    );

    if (user) {
      return true;
    } else {
      return false;
    }
  };

  validateEmail(emailRegister) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailRegister.trim());
  }

  validateUsernameLength(username, minLength) {
    return username.trim().length >= minLength;
  }

  validatePasswordLength(passwordRegister, length) {
    return passwordRegister.trim().length >= length;
  }

  isUserExists(emailRegister) {
    return this.users.some((user) => user.email === emailRegister);
  }

  signUp(emailRegister, username, passwordRegister, confirmPassword) {
    console.log("emailRegister: ", emailRegister);
    console.log("username:", username);
    console.log("passwordRegister:", passwordRegister);
    console.log("confirmPassword:", confirmPassword);

    if (!this.validateEmail(emailRegister)) {
      return false;
    }
    if (username.trim().length < 2) {
      return false;
    }

    if (!this.validatePasswordLength(passwordRegister, 8)) {
      return false;
    }

    if (passwordRegister !== confirmPassword) {
      return false;
    }

    if (this.isUserExists(emailRegister)) {
      console.log("Email is already registered.", emailRegister);
      return false;
    }

    this.users.push({ email: emailRegister, password: passwordRegister });
    console.log("this.emailRegister", emailRegister);
    console.log("this.passwordRegister", passwordRegister);

    console.log("New user added:", {
      email: emailRegister,
      password: passwordRegister,
    });

    console.log("Updated user list:");
    console.log(this.users);
  }
}

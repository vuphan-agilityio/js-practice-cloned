export default class UserModel {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.username = this.username;
    this.confirmPassword = this.confirmPassword;
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

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  validatePasswordLength(password, length) {
    return password.trim().length >= length;
  }

  isUserExists(email) {
    return this.users.some((user) => user.email === email);
  }

  signUp = (email, username, password, confirmPassword) => {
    if (!this.validateEmail(email)) {
      return { success: false, message: "Please enter a valid email address" };
    }

    if (!this.validatePasswordLength(password, 8)) {
      return {
        success: false,
        message: "Password must be at least 8 characters long",
      };
    }
    if (!this.validateUsername(username)) {
      return {
        success: false,
        message: "Username must be at least 2 characters long",
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        message: "Password and Confirm Password do not match",
      };
    }

    if (this.isUserExists(email)) {
      return { success: false, message: "Email is already registered" };
    }

    this.users.push({ email: email, password: password });
    return { success: true, message: "Sign up successful" };
  };
}

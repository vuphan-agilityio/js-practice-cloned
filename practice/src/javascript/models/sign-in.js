// Validator object and validation methods
export default class Model {
  constructor() {
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  validatePasswordLength(password, length) {
    return password.trim().length >= length;
  }
}

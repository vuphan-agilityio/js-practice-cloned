// Validator object and validation methods
const Validator = {
  isEmail: function (value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  },

  minLength: function (value, length) {
    return value.trim().length >= length;
  },
};

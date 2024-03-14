const bindEvent = (target, type, callback) => {
  target?.addEventListener(type, callback);
};

const inValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const inValidUsername = (username, minLength) => {
  return username.trim().length >= minLength;
};

const inValidPassword = (password, length) => {
  return password.trim().length >= length;
};

export {
  bindEvent,
  inValidEmail,
  inValidUsername,
  inValidPassword
};

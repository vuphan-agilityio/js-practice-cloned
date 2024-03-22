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

const delegate = (target, selector, type, handler) => {
  const dispatchEvent = (event) => {
    const targetElement = event.target;

    const potentialElements = querySelectorAll(selector, target);
    const hasMatch =
      Array.prototype.indexOf.call(
        potentialElements,
        targetElement.closest(selector)
      ) >= 0;
    if (hasMatch) handler.call(targetElement, event);
  };

  bindEvent(target, type, dispatchEvent);
};

const querySelectorAll = (selector, scope) => {
  return (scope || document).querySelectorAll(selector);
};

export { bindEvent, inValidEmail, inValidUsername, inValidPassword, delegate };

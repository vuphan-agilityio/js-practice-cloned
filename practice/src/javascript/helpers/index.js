/**
 * Method for creating and sending a fetch request to a specified URL.
 * @param {string} url - URL of the fetch request.
 * @param {string} method - The method of the fetch request (GET, POST, PUT, DELETE, etc.).
 * @param {object} data - The data to be sent (if any).
 * @param {string} contentType - Content type of the fetch request (default is "application/json").
 * @returns {Promise} - Promise resolved with the result of the fetch request.
 */
const bindEvent = (target, type, callback) => {
  target?.addEventListener(type, callback);
};

/**
 * Check the validity of an email address.
 * @param {string} email - Email address to check.
 * @returns {boolean} - True if the email address is valid, false otherwise.
 */
const inValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Check the validity of a username based on minimum length.
 * @param {string} username - Username to check.
 * @param {number} minLength - Minimum length for the username.
 * @returns {boolean} - True if the username is valid, false otherwise.
 */
const inValidUsername = (username, minLength) => {
  return username.trim().length >= minLength;
};

/**
 * Check the validity of a password based on minimum length.
 * @param {string} password - Password to check.
 * @param {number} length - Minimum length for the password.
 * @returns {boolean} - True if the password is valid, otherwise returns false.
 */
const inValidPassword = (password, length) => {
  return password.trim().length >= length;
};

/**
 * Attach an event to a parent element, but only execute the event handler function when the event is triggered on a child element that satisfies the given condition (selector).
 *
 * @param {HTMLElement} target - The parent element to which the event will be attached.
 * @param {string} selector - Selector to identify the child element on which the event will be fired.
 * @param {string} type - Event type, for example: 'click', 'submit', etc.
 * @param {Function} handler - The event handler function will be executed when an event is triggered on a child element that satisfies the condition (selector).
 */
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

/**
 * Selects all elements in the document that match a specified CSS selector within a given scope.
 * @param {string} selector - The CSS selector to match elements against.
 * @param {HTMLElement} scope - The scope within which to search for elements (optional, defaults to document).
 * @returns {NodeList} - A static NodeList containing all elements that match the specified selector.
 */
const querySelectorAll = (selector, scope) => {
  return (scope || document).querySelectorAll(selector);
};

export { bindEvent, inValidEmail, inValidUsername, inValidPassword, delegate };

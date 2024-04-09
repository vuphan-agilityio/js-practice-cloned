import { API } from "../constants/url";
import APIHelper from "./helper";

export default class AuthenticationService {
  /**
   * Handle API response
   * @param {Response} res The response object from the API
   * @returns {object} An object containing the response users or error message
   */
  static handleResponse = async (res) => {
    if (res.ok) {
      const data = await res.json();
      return {
        data,
        errMsg: null,
      };
    } else {
      return {
        data: null,
        errMsg: res.statusText,
      };
    }
  };

  /**
   * The handleError static method handles errors by returning an object with error details.
   * @param {Error} err - The error object.
   * @returns {object} - An object containing error details.
   * @property {any} data - Data associated with the error (null in this case).
   * @property {string} errMsg - Error message from the error object.
   */
  static handleError = (err) => {
    return {
      data: null,
      errMsg: err.message,
    };
  };

  /**
   * User login method using email address and password on the server.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {Promise} - Promise resolved with the result of the user login request.
   */
  static signIn = async (email, password) => {
    const response = await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_USER}?email=${email}&password=${password}`,
      "GET"
    );

    const users = response.result;
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        return users[i];
      }
    }
    return "Signed in failed!";
  };

   /**
   * Method to create new users on the server.
   * @param {object} userData - Object containing the new user's information including email, username, password and passwordConfirm.
   * @returns {Promise} - Promise is resolved with the result of the new user request.
   */
   static createUser = async ({
    email,
    username,
    password,
    passwordConfirm,
    role,
  }) => {
    return await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_USER}`,
      "POST",
      { email, username, password, passwordConfirm, role}
    );
  };

    /**
   * Method to search for users by email address on the server.
   * @param {string} email - The email address of the user to search for.
   * @returns {Promise} - Promise resolved with the results of the user search request.
   */
    static findUserByEmail = async (email) => {
      return await APIHelper.createRequest(
        `${API.BASE_URL}${API.CREATE_USER}?email=${email}`,
        "GET"
      );
    };
}

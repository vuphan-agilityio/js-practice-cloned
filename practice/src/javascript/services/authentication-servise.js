import { API } from "../constants/url";
import APIHelper from "./helper";

export default class AuthenticationServise {

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

}

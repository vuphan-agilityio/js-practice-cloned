import { API } from "../constants/url";
import APIHelper from "./helper";

export default class UserService {
  static createUser = async ({
    email,
    username,
    password,
    passwordConfirm,
  }) => {
    return await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_USER}`,
      "POST",
      { email, username, password, passwordConfirm }
    );
  };

  static findUserByEmail = async (email) => {
    return await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_USER}?email=${email}`,
      "GET"
    );
  };

  static signIn = async (email, password) => {
    return await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_USER}?email=${email}&password=${password}`,
      "GET"
    );
  };

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
   * Handle API error
   * @param {Error} err The error object
   * @returns {object} An object containing the response users or error message
   */
  static handleError = (err) => {
    return {
      data: null,
      errMsg: err.message,
    };
  };

  static fetchUsers = async () => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.CREATE_USER}`);
      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };

  static fetchProducts = async () => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.CREATE_PRODUCT}`);
      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };

  //Edit user
  static editUsers = async (userId, newUsername) => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.CREATE_USER}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUsername),
      });

      if (res.ok) {
        return true; // Thành công
      } else {
        return false; // Thất bại
      }
    } catch (err) {
      console.error(err);
      return false; // Thất bại
    }
  };


  // Add product
  static createProduct = async ({ name }) => {
    return await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_PRODUCT}`,
      "POST",
      { name }
    );
  };
}

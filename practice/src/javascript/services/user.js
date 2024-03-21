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
      const users = await res.json();
      return {
        users,
        errMsg: null,
      };
    } else {
      return {
        users: null,
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
      users: null,
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

  /**
   * Handle API response
   * @param {Response} resp The response object from the API
   * @returns {object} An object containing the response product or error message
   */
  static handleResponse = async (resp) => {
    if (resp.ok) {
      const product = await resp.json();
      return {
        product,
        errMsg: null,
      };
    } else {
      return {
        product: null,
        errMsg: resp.statusText,
      };
    }
  };

  /**
   * Handle API error
   * @param {Error} err The error object
   * @returns {object} An object containing the response product or error message
   */
  static handleError = (err) => {
    return {
      product: null,
      errMsg: err.message,
    };
  };

  static fetchProduct = async () => {
    try {
      const resp = await fetch(`${API.BASE_URL}${API.CREATE_PRODUCT}`);
      return this.handleResponse(resp);
    } catch (err) {
      return this.handleError(err);
    }
  };
}

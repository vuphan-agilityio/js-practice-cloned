import { API } from "../constants/url";
import APIHelper from "./helper";

export default class UserService {
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

  /**
   * Fetch method to edit user information on the server.
   * @param {string} userId - ID of the user to edit.
   * @param {object} payload - Object containing the user's new information.
   * @returns {Promise} - Promise resolved with the result of the fetch request.
   */
  static editUsers = async (userId, payload) => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.CREATE_USER}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };

  /**
   * The deleteUser function sends a request to delete a user from the server.
   * @param {string} userId - The ID of the user to be deleted.
   * @param {object} payload - The optional payload data to be included in the request body.
   * @returns {Promise<object>} - A Promise that resolves to an object containing the response data or error information.
   */
  static deleteUser = async (userId, payload) => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.CREATE_USER}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };
}

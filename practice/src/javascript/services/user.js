import { API } from "../constants/url";
import APIHelper from "./helper";

export default class UserService {
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
      { email, username, password, passwordConfirm, role }
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

  // /**
  //  * User login method using email address and password on the server.
  //  * @param {string} email - User's email address.
  //  * @param {string} password - User's password.
  //  * @returns {Promise} - Promise resolved with the result of the user login request.
  //  */
  // static signIn = async (email, password) => {
  //   const response = await APIHelper.createRequest(
  //     `${API.BASE_URL}${API.CREATE_USER}?email=${email}&password=${password}`,
  //     "GET"
  //   );

  //   const users = response.result;
  //   for (var i = 0; i < users.length; i++) {
  //     if (users[i].email === email && users[i].password === password) {
  //       return users[i];
  //     }
  //   }
  //   return "Signed in failed!";
  // };

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

  // /**
  //  * Fetch method to get recipe list from the server.
  //  * @returns {Promise} - Promise resolved with the result of the fetch request.
  //  */
  // static fetchRecipes = async () => {
  //   try {
  //     const res = await fetch(`${API.BASE_URL}${API.CREATE_PRODUCT}`);
  //     return this.handleResponse(res);
  //   } catch (err) {
  //     return this.handleError(err);
  //   }
  // };

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

  // /**
  //  * Fetch method to create a new recipe on the server.
  //  * @param {object} recipeInfo - Object containing information about the new recipe.
  //  * @param {string} recipeInfo.name - Name of the new recipe.
  //  * @returns {Promise} - Promise resolved with the result of the fetch request.
  //  */
  // static createRecipe = async ({ name, image, category, creator, ratings, description, instruction, ingredient, nutrition, createdAt}) => {
  //   return await APIHelper.createRequest(
  //     `${API.BASE_URL}${API.CREATE_PRODUCT}`,
  //     "POST",
  //     { name, imageURL: image ,category, creator, ratings, description, instruction, ingredient, nutrition, createdAt}

  //   );
  // };

  // static editRecipe = async (recipeId, payload) => {
  //   try {
  //     const res = await fetch(`${API.BASE_URL}${API.CREATE_PRODUCT}/${recipeId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     return this.handleResponse(res);
  //   } catch (err) {
  //     return this.handleError(err);
  //   }
  // };

  // static deleteRecipe = async (recipeId) => {
  //   try {
  //     const res = await fetch(`${API.BASE_URL}${API.CREATE_PRODUCT}/${recipeId}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     return this.handleResponse(res);
  //   } catch (err) {
  //     return this.handleError(err);
  //   }
  // };
}

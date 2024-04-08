import { API } from "../constants/url";
import APIHelper from "./helper";

export default class RecipeService {
  /**
   * Fetch method to get recipe list from the server.
   * @returns {Promise} - Promise resolved with the result of the fetch request.
   */
  static fetchRecipes = async () => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.CREATE_PRODUCT}`);
      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };

  static fetchRecipeDetail = async (id) => {
    return await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_PRODUCT}?id=${id}`,
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

  static handleError = (err) => {
    return {
      data: null,
      errMsg: err.message,
    };
  };

  /**
   * Fetch method to create a new recipe on the server.
   * @param {object} recipeInfo - Object containing information about the new recipe.
   * @param {string} recipeInfo.name - Name of the new recipe.
   * @returns {Promise} - Promise resolved with the result of the fetch request.
   */
  static createRecipe = async ({
    name,
    image,
    category,
    creator,
    ratings,
    description,
    createdAt,
  }) => {
    return await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_PRODUCT}`,
      "POST",
      {
        name,
        imageURL: image,
        category,
        creator,
        ratings,
        description,
        createdAt,
      }
    );
  };

  /**
   * The editRecipe static method updates an existing recipe with the provided payload.
   * @param {string} recipeId - The ID of the recipe to be updated.
   * @param {object} payload - The payload containing updated recipe details.
   * @returns {Promise<object>} - A Promise resolving to the response object.
   */
  static editRecipe = async (recipeId, payload) => {
    try {
      const res = await fetch(
        `${API.BASE_URL}${API.CREATE_PRODUCT}/${recipeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };

  /**
   * The deleteRecipe static method deletes a recipe with the specified recipeId.
   * @param {string} recipeId - The ID of the recipe to be deleted.
   * @returns {Promise<object>} - A Promise resolving to the response object.
   */
  static deleteRecipe = async (recipeId) => {
    try {
      const res = await fetch(
        `${API.BASE_URL}${API.CREATE_PRODUCT}/${recipeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  };
}

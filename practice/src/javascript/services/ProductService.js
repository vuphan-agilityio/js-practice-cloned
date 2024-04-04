import { API } from "../constants/url";
import APIHelper from "./helper";

export default class ProductService {
  /**
   * Fetch method to get product list from the server.
   * @returns {Promise} - Promise resolved with the result of the fetch request.
   */
  static fetchProducts = async () => {
    try {
      const res = await fetch(`${API.BASE_URL}${API.CREATE_PRODUCT}`);
      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
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
   * Fetch method to create a new product on the server.
   * @param {object} productInfo - Object containing information about the new product.
   * @param {string} productInfo.name - Name of the new product.
   * @returns {Promise} - Promise resolved with the result of the fetch request.
   */
  static createProduct = async ({
    name,
    image,
    category,
    creator,
    ratings,
    description,
    instruction,
    ingredients,
    nutrition,
    createdAt,
  }) => {
    return await APIHelper.createRequest(
      `${API.BASE_URL}${API.CREATE_PRODUCT}`,
      "POST",
      {
        name,
        imageUrl: image,
        category,
        creator,
        ratings,
        description,
        instruction,
        ingredients,
        nutrition,
        createdAt,
      }
    );
  };

  static editProduct = async (productId, payload) => {
    try {
      const res = await fetch(
        `${API.BASE_URL}${API.CREATE_PRODUCT}/${productId}`,
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

  static deleteProduct = async (productId) => {
    try {
      const res = await fetch(
        `${API.BASE_URL}${API.CREATE_PRODUCT}/${productId}`,
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

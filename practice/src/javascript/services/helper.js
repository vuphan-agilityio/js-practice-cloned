export default class APIHelper {
  /**
   * Method for creating and sending a fetch request to a specified URL.
   *
   * @param {string} url - URL of the fetch request.
   * @param {string} method - The method of the fetch request (GET, POST, PUT, DELETE, etc.).
   * @param {object} data - The data to be sent (if any).
   * @param {string} contentType - Content type of the fetch request (default is "application/json").
   * @returns {Promise} - Promise resolved with the result of the fetch request.
   */
  static createRequest = async (
    url,
    method,
    data,
    contentType = "application/json"
  ) => {
    try {
      let content = {
        method,
        headers: {
          "Content-Type": contentType,
        },
      };

      if (data) {
        content.body = JSON.stringify(data);
      }

      const response = await fetch(url, content);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();

      return { response, result };
    } catch (error) {
      return { error };
    }
  };
}

/**
 * The template of user table content item
 *  @param {object} data The user's data
 */
export const usersTableTemplate = (data) => {
  let users = "";
  if (data && data.length) {
    data.forEach((user) => {
      users += userTemplate(user);
    });
  }
  return users;
};


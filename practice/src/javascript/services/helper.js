export default class APIHelper {
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

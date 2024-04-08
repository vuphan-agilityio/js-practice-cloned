/**
 * The userRowTemplate function takes in an array of data containing information about the user and returns an HTML string representing the rows of the users table.
 * @param {Array} data - Array containing information about the user (including id, username and email).
 * @returns {string} - HTML string representing rows of the users table.
 */
const userRowTemplate = (data) => {
  return data.length
    ? data
        .map((item) => {
          return `
    <tr class="table__row user-row" data-id=${item.id}>
      <td class="table__row__cell">
        <p class="table__title user-name">${item.username}</p>
      </td>
      <td class="table__row__cell user-email">
        <p class="table__title">${item.email}</p>
      </td>
    </tr>
  `;
        })
        .join("")
    : "";
};

/**
 * The renderUserTableTemplate function takes in an array of data containing information about the user and returns an HTML string representing a table of user data.
 * @param {Array} data - Array containing information about the user (including id, username and email).
 * @returns {string} - HTML string representing a table of user data.
 */
const renderUserTableTemplate = (data) => {
  return `
    <table class="table__wrapper toolbar__title">
      <thead class="table__head">
        <tr class="table__header">
          <th class="table__header__cell">Full name</th>
          <th class="table__header__cell">Email</th>
        </tr>
      </thead>

      <tbody class="table__body" id="user-body">
        ${userRowTemplate(data)}
      </tbody>
    </table>
  `;
};

/**
 * The renderUserDetails function takes an object containing the user's details and returns an HTML string representing that user's details.
 * @param {object} data - Object containing user details (including id, username and email).
 * @returns {string} - HTML string representing user details.
 */
const renderUserDetails = (data) => {
  return `
    <div class="panel__edit">
      <span class="panel__icon-back drawer__user-icon" id="icon-back"></span>
      <button class="btn__general">General</button>
    </div>

    <div class="panel__confirm" data-id=${data.id}>
      <button class="btn__delete btn__save" id="delete-user">Delete</button>
      <button class="btn__save btn-edit" id="save-edit">Save</button>
    </div>

    <forrm class="panel__edit-profile">
      <div class="panel__item">
        <label class="panel__label">Full Name</label>
        <input id="name-input" type="text" class="panel__input" value=${data.username}>
      </div>

      <div class="panel__item">
        <label class="panel__label">Email</label>
        <input id="mail-input" type="text" class="panel__input" value=${data.email}>
      </div>
    </forrm>
  `;
};

/**
 * The renderUserEditor function takes an object containing information about the user and returns an HTML string representing the user's information editor.
 * @param {object} data - Object containing information about the user (including email and username).
 * @returns {string} - HTML string representing the user's information editor.
 */
const renderUserEditor = (data) => {
  return `
  <div class="sidebar__header">
    <h2 class="sidebar__title modal__title">User infomation</h2>
    <span class="sidebar__status">Not active</span>
    <span class="sidebar__icon-edit drawer__user-icon"></span>
  </div>

  <div class="sidebar__item">
    <ul>
      <li class="sidebar__list">
        <div class="sidebar__detail">
          <span class="sidebar__icon-email drawer__user-icon"></span>
          <p>Email:</p>

        </div>
        <p class="sidebar__desc">${data.email}</p>
      </li>

      <li class="sidebar__list">
        <div class="sidebar__detail">
          <span class="sidebar__icon-oclock drawer__user-icon"></span>
          <p>User Name: </p>
        </div>
        <p class="sidebar__desc">${data.userName}</p>
      </li>
    </ul>
  </div>
  `;
};

export { renderUserTableTemplate, renderUserDetails, renderUserEditor };

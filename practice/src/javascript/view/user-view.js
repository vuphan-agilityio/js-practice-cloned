import { bindEvent, delegate } from "../helpers";
import { renderUserTableTemplate, renderUserDetails } from "../templates/user";


export default class UserView {
  constructor() {
    // Table
    this.tableWrapperEl = document.getElementById("table-wrapper");

    // Edit users
    this.rowEl = document.querySelectorAll(".table__row");
    this.userDetailsContainerEl = document.querySelector(".panel");

    // Render recipes
    this.recipesListEl = document.querySelector(".recipes__list");
    this.panelEl = document.querySelector(".panel");
  }

  /**
   * The bindCallback function binds events to corresponding handlers on HTML elements in the user interface.
   * @param {string} event - Event name to attach.
   * @param {function} handler - The handler function is called when the event occurs.
   */
  bindCallback = (event, handler) => {
    switch (event) {
      case "displayPanel":
        const selectPanelEl = document.getElementById("user-body");
        bindEvent(selectPanelEl, "click", this.displayPanel); // DisplayPanel
        break;
      // case "backToggle":
      //   const selectBackEl = document.getElementById("icon-back");
      //   bindEvent(selectBackEl, "click", this.backToggle);
      //   break;

      // case "addRecipe":
      //   bindEvent(this.selectAddEl, "submit", this.addRecipe(handler)); // Toggle icon recipes
      //   break;
      case "userRowClick":
        this.tBodyEl = document.querySelector(".table__body");
        delegate(
          this.tBodyEl,
          ".table__row",
          "click",
          this.showUserById(handler)
        );
        break;
      case "editUser":
        this.sidebarDetailEl = document.getElementById("panel-details");
        delegate(
          this.sidebarDetailEl,
          ".btn-edit",
          "click",
          this.editUser(handler)
        );
        break;
      case "deleteUser":
        this.sidebarDetailEl = document.getElementById("panel-details");
        delegate(
          this.sidebarDetailEl,
          ".btn-delete-user",
          "click",
          this.deleteUser(handler)
        );
        break;
      default:
        break;
    }
  };
  /**
   * The displayPanel function displays or hides a panel on the user interface when a click event occurs.
   * @param {object} event - Click event object.
   */
  displayPanel = (event) => {
    event.preventDefault();
    const detailPanel = document.getElementById("panel-details");
    detailPanel.classList.toggle("show-panel");
    this.bindCallback("saveUsers");
  };

  /**
   * The editUser function returns a processing function to edit a user's information.
   * @param {function} handler - Handler function to edit user information.
   * @returns {function} - A handler function attached to the user information edit event.
   */
  editUser = (handler) => (event) => {
    const userName = document.getElementById("name-input").value.trim();
    const userId = document.querySelector(".panel__confirm").getAttribute("data-id");
    handler(userId, userName);
  };

  /**
 * The deleteUser function retrieves the user ID from the confirmation panel and invokes a handler function to delete the user.
 * @param {function} handler - The handler function to be invoked with the user ID.
 */
  deleteUser = (handler) => (event) => {
    const userId = document.querySelector(".panel__confirm").getAttribute("data-id");
    handler(userId);
  };

  /**
   * The redirectPage function redirects the website to another page.
   * @param {string} page - URL of the page you want to redirect to.
   */
  redirectPage = (page) => {
    window.location.replace(page);
  };

  /**
   * The renderTables function renders the user data table to the user interface.
   * @param {Array} users - Array containing user information.
   */
  renderTables = (users) => {
    this.tableWrapperEl.innerHTML = renderUserTableTemplate(users);
  };

  /**
   * The showUserDetails function displays a user's details on the user interface.
   *
   * @param {object} userDetails - Object containing user details including id, username and email.
   */
  showUserDetails = ({ id, username, email }) => {
    this.panelEl.innerHTML = renderUserDetails({
      id,
      username,
      email,
    });
    this.userDetailsContainerEl.classList.add("show-panel");
  };

  /**
   * The showUserById function handles the event when the user selects a user from the table and displays that user's details.
   * @param {function} handler - Function to handle when showUserById event is triggered.
   */
  showUserById = (handler) => (event) => {
    const userId = event.target.closest(".table__row").dataset.id;
    handler(userId);
  };
}

import { bindEvent, delegate } from "../helpers";
import { renderUserTableTemplate, renderUserDetails } from "../templates/user";
import {
  renderProductTableTemplate,
  renderProductDetails,
} from "../templates/product";

export default class UserView {
  constructor() {
    this.signInFormEl = document.getElementById("form-sign-in");
    this.signUpFormEl = document.getElementById("form-sign-up");
    // this.emailEl = document.getElementById("email");
    // this.passwordEl = document.getElementById("password");
    this.userNameEl = document.getElementById("username");
    this.passwordConfirmEl = document.getElementById("confirmPassword");
    this.idUserEl = document.getElementById("id-user");

    // Toggle menu
    this.selectEl = document.querySelector(".navbar-user__icon-menu");
    this.drawerEl = document.querySelector(".drawer");
    this.isShowDrawer = false;

    // Toggle button new
    this.selectNewEl = document.querySelector(".btn__drawer");
    this.formEl = document.querySelector(".modal");
    this.isShowForm = false;

    // Toggle icon close
    this.selectCloseEl = document.querySelector(".modal__icon");
    this.formEl = document.querySelector(".modal");
    this.isShowForm = false;

    // Toggle item product
    this.navigationEl = document.querySelector(".navigation");
    this.toolEl = document.querySelector(".toolbar__title");
    this.panelEl = document.querySelector(".panel");

    // Table
    this.tableWrapperEl = document.getElementById("table-wrapper");

    // Add
    this.selectAddEl = document.getElementById("form-add-product");
    this.nameEl = document.getElementById("input_name");
    this.image = document.getElementById("input_image");
    this.desEL = document.getElementById("product-description-input");
    this.categoryEl = document.getElementById("product-category-input");
    this.creatorEl = document.getElementById("product-creator-input");
    this.ratingEl = document.getElementById("product-ratings-input");
    this.instructEL = document.getElementById("product-instruction-input");
    this.ingredientEL = document.getElementById("product-ingredients-input");
    this.nutriEL = document.getElementById("product-nutrition-input");

    // Edit users
    this.rowEl = document.querySelectorAll(".table__row");
    this.userDetailsContainerEl = document.querySelector(".panel");
  }

  /**
   * The bindCallback function binds events to corresponding handlers on HTML elements in the user interface.
   * @param {string} event - Event name to attach.
   * @param {function} handler - The handler function is called when the event occurs.
   */
  bindCallback = (event, handler) => {
    switch (event) {
      case "signIn":
        bindEvent(this.signInFormEl, "submit", this.signIn(handler));
        break;
      case "signUp":
        bindEvent(this.signUpFormEl, "submit", this.signUp(handler));
        break;
      case "menuToggle":
        bindEvent(this.selectEl, "click", this.menuToggle); // Toggle menu
        break;
      case "newToggle":
        bindEvent(this.selectNewEl, "click", this.newToggle); // Toggle button new
        break;
      case "closeToggle":
        bindEvent(this.selectCloseEl, "click", this.closeToggle); // Toggle icon close
        break;
      case "displayPanel":
        const selectPanelEl = document.getElementById("user-body");
        bindEvent(selectPanelEl, "click", this.displayPanel); // DisplayPanel
        break;
      // case "backToggle":
      //   const selectBackEl = document.getElementById("icon-back");
      //   bindEvent(selectBackEl, "click", this.backToggle);
      //   break;
      case "navigationItem":
        delegate(
          this.navigationEl,
          ".navigation__item",
          "click",
          this.navToggle(handler)
        ); // Toggle icon products
        break;
      case "addProduct":
        bindEvent(this.selectAddEl, "submit", this.addProduct(handler)); // Toggle icon products
        break;
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
          ".btn-edit-user",
          "click",
          this.editUser(handler)
        );
        break;
      case "deleteUser":
        this.sidebarDetailEl = document.getElementById("panel-details");
        delegate(
          this.sidebarDetailEl,
          ".btn__delete",
          "click",
          this.deleteUser(handler)
        );
        break;
      case "productRowClick":
        this.tBodyEl = document.querySelector(".table-body__product");
        delegate(
          this.tBodyEl,
          ".table__row",
          "click",
          this.showProductById(handler)
        );
        break;
      case "editProduct":
        this.sidebarDetailEl = document.getElementById("panel-details");
        delegate(
          this.sidebarDetailEl,
          ".btn-edit-product",
          "click",
          this.editProduct(handler)
        );
        break;
      case "deleteProduct":
        this.sidebarDetailEl = document.getElementById("panel-details");
        delegate(
          this.sidebarDetailEl,
          ".btn-delete-product",
          "click",
          this.deleteProduct(handler)
        );
        break;
      default:
        break;
    }
  };

  /**
   * The editUser function returns a processing function to edit a user's information.
   * @param {function} handler - Handler function to edit user information.
   * @returns {function} - A handler function attached to the user information edit event.
   */
  editUser = (handler) => (event) => {
    const userName = document.getElementById("name-input").value.trim();
    const userId = document
      .querySelector(".panel__confirm")
      .getAttribute("data-id");
    handler(userId, userName);
  };

  deleteUser = (handler) => (event) => {
    const userId = document
      .querySelector(".panel__confirm")
      .getAttribute("data-id");
    handler(userId);
  };

  deleteProduct = (handler) => (event) => {
    const productId = document
      .querySelector(".panel__confirm")
      .getAttribute("data-id");
    handler(productId);
  };

  editProduct = (handler) => (event) => {
    const productImage = document.getElementById("image-input").value.trim();
    const productName = document
      .getElementById("product-name-input")
      .value.trim();
    const productId = document
      .querySelector(".panel__confirm")
      .getAttribute("data-id");
    handler(productImage, productName, productId);
  };

  /**
   * The menuToggle function changes the display state of the menu on the user interface when a click event occurs.
   * @param {object} event - Click event object.
   */
  menuToggle = (event) => {
    event.preventDefault();
    if (this.drawerEl.classList.contains("show")) {
      this.drawerEl.classList.remove("show");
    } else {
      this.drawerEl.classList.add("show");
    }
  };

  /**
   * The newToggle function changes the display state of a form on the user interface upon a cli event
   * @param {object} event - Click event object.
   */
  newToggle = (event) => {
    event.preventDefault();
    if (this.formEl.classList.contains("show-form")) {
      this.formEl.classList.remove("show-form");
    } else {
      this.formEl.classList.add("show-form");
    }
  };

  /**
   * The closeToggle function changes the display state of a user interface element when a click event occurs.
   * @param {object} event - Click event object.
   */
  closeToggle = (event) => {
    event.preventDefault();
    if (this.formEl.classList.contains("show-form")) {
      this.formEl.classList.remove("show-form");
    } else {
      this.formEl.classList.add("show-form");
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
   * The backToggle function changes the display state of a panel when a click event occurs.
   * @param {object} event - Click event object.
   */
  backToggle = (event) => {
    event.preventDefault();
    if (this.detailPanel.classList.contains("hindder-panel")) {
      this.detailPanel.classList.remove("hindder-panel");
    } else {
      this.detailPanel.classList.add("hindder-panel");
    }
  };

  /**
   * The setNavigationActive function sets the active class for the navigation item corresponding to the selected type.
   * @param {string} type - Type of navigation item to set as activity.
   */
  setNavigationActive = (type) => {
    document
      .querySelector(".navigation__item.active")
      ?.classList.remove("active");

    switch (type) {
      case "users":
        document
          .querySelector(".navigation__item[data-id='users']")
          .classList.add("active");
        this.urlParams = new URLSearchParams(window.location.search);
        this.urlParams.set("nav", "users");
        break;
      case "products":
        document
          .querySelector(".navigation__item[data-id='products']")
          .classList.add("active");
        break;
      default:
        break;
    }
  };

  /**
   * The navToggle function handles click events on navigation items on the user interface.
   * @param {function} handler - Function to handle when the navToggle event is triggered.
   * @returns {function} - A function that handles click events on navigation items.
   */
  navToggle = (handler) => (event) => {
    event.preventDefault();
    const type = event.target.closest(".navigation__item").dataset.id;

    this.setNavigationActive(type);

    if (type === "users") {
      this.toolEl.textContent = "User";
    } else {
      this.toolEl.textContent = "Products";
    }

    handler(type);
  };

  /**
   * The signIn function handles the login event on the user interface.
   * @param {function} handler - Function to handle when the login event is triggered.
   * @returns {function} - A login event handler function.
   */
  signIn = (handler) => {
    return (event) => {
      event.preventDefault();
      const emailEl = document.getElementById("email");
      const passwordEl = document.getElementById("password");
      console.log("email", emailEl.value);
      console.log("paasss", passwordEl.value);
      handler(emailEl.value, passwordEl.value);
    };
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
   * The renderTableProducts function renders the product data table to the user interface.
   * @param {Array} data - Array containing product information.
   */
  renderTableProducts = (data) => {
    this.tableWrapperEl.innerHTML = renderProductTableTemplate(data);
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

  showProductDetails = ({
    id,
    imageUrl,
    name,
    category,
    creator,
    ratings,
    description,
    instruction,
    ingredients,
    nutrition,
  }) => {
    this.panelEl.innerHTML = renderProductDetails({
      id,
      imageUrl,
      name,
      category,
      creator,
      ratings,
      description,
      instruction,
      ingredients,
      nutrition,
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

  showProductById = (handler) => (event) => {
    const productId = event.target.closest(".table__row").dataset.id;
    handler(productId);
  };

  /**
   * The signUp function handles the user registration event on the user interface.
   * @param {function} handler - Function to handle when the signUp event is triggered.
   * @returns {function} - A function that handles the submit event when registering a user.
   */
  signUp = (handler) => {
    return (event) => {
      event.preventDefault();
      const emailEl = document.getElementById("email");
      const passwordEl = document.getElementById("password");
      handler({
        email: emailEl.value,
        username: this.userNameEl.value,
        password: passwordEl.value,
        passwordConfirm: this.passwordConfirmEl.value,
      });
    };
  };

  addProduct = (handler) => {
    return (event) => {
      event.preventDefault();
      handler({
        name: this.nameEl.value,
        image: this.image.value,
        category: this.categoryEl.value,
        creator: this.creatorEl.value,
        ratings: this.ratingEl.value,
        description: this.desEL.value,
        instruction: this.instructEL.value,
        ingredients: this.ingredientEL.value,
        nutrition: this.nutriEL.value
      });
    };
  };
}

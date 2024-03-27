import { bindEvent, delegate } from "../helpers";
import { renderUserTableTemplate, renderUserDetails } from "../templates/user";
import { renderProductTableTemplate } from "../templates/product";

export default class UserView {
  constructor() {
    this.signInFormEl = document.getElementById("form-sign-in");
    this.signUpFormEl = document.getElementById("form-sign-up");
    this.emailEl = document.getElementById("email");
    this.passwordEl = document.getElementById("password");
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

    // Display panel

    // Toggle item product
    this.navigationEl = document.querySelector(".navigation");
    this.toolEl = document.querySelector(".toolbar__title");
    this.panelEl = document.querySelector(".panel");

    // Table
    this.tableWrapperEl = document.getElementById("table-wrapper");

    // Add
    this.selectAddEl = document.getElementById("form-add-product");
    this.nameEl = document.getElementById("name");

    // Edit users
    this.rowEl = document.querySelectorAll(".table__row");
    this.userDetailsContainerEl = document.querySelector(".panel");
  }

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
      // case "addProduct":
      //   bindEvent(this.selectAddEl, "submit", this.addProduct(handler)); // Toggle icon products
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
      default:
        break;
    }
  };

  handleClickSaveUser = (handler) => {
    const saveEl = document.getElementById("save-edit");
    saveEl?.addEventListener("click", () => {
      const usernameInput = document.getElementById("name-input").value.trim();
      const userId = saveEl.getAttribute("data-id");
      if (!usernameInput) {
        alert("Username cannot be empty!");
      } else {
        const result = handler(userId, usernameInput);
        console.log("user view", userId);
        console.log("userinput", usernameInput);
        if (result) {
          alert("Edit successful!");
        } else {
          alert("Edit failed!");
        }
      }
    });
  };

  // Toggle menu
  menuToggle = (event) => {
    event.preventDefault();
    if (this.drawerEl.classList.contains("show")) {
      this.drawerEl.classList.remove("show");
    } else {
      this.drawerEl.classList.add("show");
    }
  };

  //Toggle button new
  newToggle = (event) => {
    event.preventDefault();
    if (this.formEl.classList.contains("show-form")) {
      this.formEl.classList.remove("show-form");
    } else {
      this.formEl.classList.add("show-form");
    }
  };

  // Toggle icon close
  closeToggle = (event) => {
    event.preventDefault();
    if (this.formEl.classList.contains("show-form")) {
      this.formEl.classList.remove("show-form");
    } else {
      this.formEl.classList.add("show-form");
    }
  };

  // Display panel
  displayPanel = (event) => {
    event.preventDefault();
    const detailPanel = document.getElementById("panel-details");
    detailPanel.classList.toggle("show-panel");
    this.bindCallback("saveUsers");
  };

  // Back toggle
  backToggle = (event) => {
    event.preventDefault();
    if (this.detailPanel.classList.contains("hindder-panel")) {
      this.detailPanel.classList.remove("hindder-panel");
    } else {
      this.detailPanel.classList.add("hindder-panel");
    }
  };

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

  // Change toolbar title user
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

  signIn = (handler) => {
    return (event) => {
      event.preventDefault();
      handler(this.emailEl.value, this.passwordEl.value);
    };
  };

  redirectPage = (page) => {
    window.location.replace(page);
  };

  // Render table user
  renderTables = (users) => {
    this.tableWrapperEl.innerHTML = renderUserTableTemplate(users);
  };

  // Render table product
  renderTableProducts = (data) => {
    this.tableWrapperEl.innerHTML = renderProductTableTemplate(data);
  };

  showUserDetails = ({ id, username, email }) => {
    this.panelEl.innerHTML = renderUserDetails({
      id,
      username,
      email,
    });
    console.log("[view][showUserDetails] id", id);
    console.log("[view][showUserDetails] username", username);
  };

  // Show id user
  showUserById = (handler) => (event) => {
    const userId = event.target.closest(".table__row").dataset.id;
    handler(userId);
  };

  signUp = (handler) => {
    return (event) => {
      event.preventDefault();
      handler({
        email: this.emailEl.value,
        username: this.userNameEl.value,
        password: this.passwordEl.value,
        passwordConfirm: this.passwordConfirmEl.value,
      });
    };
  };

  // addProduct = (handler) => {
  //   return (event) => {
  //     event.preventDefault();
  //     handler({
  //       name: this.nameEl.value,
  //     });
  //   };
  // };
}

import { bindEvent } from "../helpers";
import { userRowTemplate } from '../templates/user';
import { productRowTemplateProduct } from '../templates/product';

export default class UserView {
  constructor() {
    this.signInFormEl = document.getElementById("form-sign-in");
    this.signUpFormEl = document.getElementById("form-sign-up");
    this.emailEl = document.getElementById("email");
    this.passwordEl = document.getElementById("password");
    this.userNameEl = document.getElementById("username");
    this.passwordConfirmEl = document.getElementById("confirmPassword");

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
    this.selectProcudtEl = document.querySelector(".product")
    this.toolEl = document.querySelector(".toolbar__title");
    this.tablePdEl = document.querySelector(".table-product");

    // Toggle item user
    this.selectUserEl = document.querySelector(".user")
    this.toolUsEl = document.querySelector(".toolbar__title");
    this.tableUsEl = document.querySelector(".table");

    // Tables user
    this.tableBodyEl = document.querySelector(".table-body");

    // Table product
    this.tableBodyPdEl = document.querySelector(".table-body__product");
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
      case "userToggle":
        bindEvent(this.selectUserEl, "click", this.userToggle); // Toggle item users
          break;
      case "productToggle":
          bindEvent(this.selectProcudtEl, "click", this.productToggle); // Toggle icon products
          break;
      default:
        break;
    }
  };

  // Toggle menu
  menuToggle = (event) => {
    event.preventDefault();
    if (this.drawerEl.classList.contains("show")) {
      this.drawerEl.classList.remove("show")
    } else {
      this.drawerEl.classList.add("show")
    }
  };

  //Toggle button new
  newToggle = (event) => {
    event.preventDefault();

    if (this.formEl.classList.contains("show-form")) {
      this.formEl.classList.remove("show-form")
    } else {
      this.formEl.classList.add("show-form")
    }
  };

  // Toggle icon close
  closeToggle = (event) => {
    event.preventDefault();
    if (this.formEl.classList.contains("show-form")) {
      this.formEl.classList.remove("show-form")
    } else {
      this.formEl.classList.add("show-form")
    }
  };

  // Change toolbar title product
  productToggle = (event) => {
    event.preventDefault();
    this.toolEl.textContent = "Product";
    if (this.tablePdEl.classList.contains("show-product")) {
      this.tablePdEl.classList.remove("show-product");
    } else {
      this.tablePdEl.classList.add("show-product")
    }
  };

  // Change toolbar title user
  userToggle = (event) => {
    event.preventDefault();
    this.toolUsEl.textContent = "User";
    if (this.tableUsEl.classList.contains("show-user")) {
      this.tableUsEl.classList.remove("show-user");
    } else {
      this.tableUsEl.classList.add("show-user")
    }
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
    this.tableBodyEl.innerHTML = userRowTemplate(users);
  }

  // Render table product
  renderTableProduct = (product) => {
    console.log("product", product)
    this.tableBodyPdEl.innerHTML = productRowTemplateProduct(product);
  }

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
}

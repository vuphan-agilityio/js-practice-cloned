import { bindEvent } from "../helpers";

export default class DashBoardView {
  constructor() {
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
    // this.toolEl = document.querySelector(".toolbar__title");
    this.panelEl = document.querySelector(".panel");
  }

  bindCallback = (event, handler) => {
    switch (event) {


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

      // case "addProduct":
      //   bindEvent(this.selectAddEl, "submit", this.addProduct(handler)); // Toggle icon products
      //   break;

      default:
        break;
    }
  };
  /**
   * The newToggle function changes the display state of a form on the user interface upon a cli event
   * @param {object} event - Click event object.
   */
  newToggle = (event) => {
    event.preventDefault();
    console.log("show form", this.formEl);
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
    this.isShowForm = false;
      this.formEl.classList.remove("show-form");
    } else {
      this.formEl.classList.add("show-form");
    }
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
   * The displayPanel function displays or hides a panel on the user interface when a click event occurs.
   * @param {object} event - Click event object.
   */
  displayPanel = (event) => {
    event.preventDefault();
    const detailPanel = document.getElementById("panel-details");
    detailPanel.classList.toggle("show-panel");
    this.bindCallback("saveUsers");
  };
}

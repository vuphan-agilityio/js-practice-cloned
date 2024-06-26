import { bindEvent } from "../helpers";

export default class ToggleView {
  constructor() {
    this.selectEl = document.querySelector(".navbar-user__icon-menu");
    this.drawerEl = document.querySelector(".drawer");
  }

  bindCallback = (event, handler) => {
    switch (event) {
      case "menuToggle":
        bindEvent(this.selectEl, "click", this.menuToggle);
        break;
      default:
        break;
    }
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
}

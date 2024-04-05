export default class ToggleView {
  constructor() {
    // Toggle menu
  this.selectEl = document.querySelector(".navbar-user__icon-menu");
  this.drawerEl = document.querySelector(".drawer");
  this.isShowDrawer = false;
  }

  bindCallback = (event, handler) => {
    switch (event) {

      case "menuToggle":
        bindEvent(this.selectEl, "click", this.menuToggle); // Toggle menu
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
        console.log("menu", this.drawerEl)
        this.drawerEl.classList.remove("show");
      } else {
        this.drawerEl.classList.add("show");
      }
    };

}

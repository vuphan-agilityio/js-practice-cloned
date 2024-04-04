export default class ToggleController {
  constructor( view) {
    this.view = view;
  }

  init = async () => {
    this.view.bindCallback("menuToggle");
  };
}


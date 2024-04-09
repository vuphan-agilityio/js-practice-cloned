
export default class DashBoardController {
  constructor( view) {
    this.view = view;
  }

  init = async () => {
    this.view.bindCallback("newToggle");
    this.view.bindCallback("closeToggle");
    this.view.bindCallback("displayPanel");
    this.view.bindCallback("backToggle");
  };

}

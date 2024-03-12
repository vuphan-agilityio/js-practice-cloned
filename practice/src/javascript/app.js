import UserModel from "./models/UserModel.js";
import UserView from "./view/UserView.js";
import UserController from "./controllers/UserController.js";

window.addEventListener("load", () => {
  const app = new UserController(new UserModel(), new UserView());
  app.init();
});

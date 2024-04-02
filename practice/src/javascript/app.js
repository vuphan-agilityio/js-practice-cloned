import UserModel from "./models/UserModel.js";
import UserView from "./view/UserView.js";
import UserController from "./controllers/UserController.js";

window.addEventListener("load", () => {
  const user = localStorage.getItem("user")
  const url = window.location.pathname
  if(!user && url !== "/login") {
    window.location.replace("login")
  }
  const app = new UserController(new UserModel(), new UserView());
  app.init();
});

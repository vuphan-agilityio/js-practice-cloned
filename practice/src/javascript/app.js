import UserModel from "./models/UserModel.js";
import UserView from "./view/UserView.js";
import UserController from "./controllers/UserController.js";
import ProductView from "./view/ProductView.js";
import ProductController from "./controllers/productController.js";
import ProductModel from "./models/ProductModel.js";
import { delegate } from "./helpers/index.js";
import AuthenticationController from "./controllers/AuthenticationController.js";
import AuthenticationView from "./view/AuthenticationView.js";
import DashBoardController from "./controllers/dashbord-controller.js";
import DashBoardView from "./view/dashboard-view.js";
import ToggleController from "./controllers/toggle-controller.js";
import ToggleView from "./view/toggle-view.js";

window.addEventListener("load", () => {
  const authenticationController = new AuthenticationController(new UserModel(), new AuthenticationView());
  authenticationController.init();



  const user = localStorage.getItem("user");
  const pathname = window.location.pathname;
  if (!user && pathname !== "/login") {
    window.location.replace("login");
  }
  console.log("path", pathname);
  if (pathname == "/user-manager.html") {
    const userController = new UserController(new UserModel(), new UserView());
    const recipesController = new ProductController(
      new ProductModel(),
      new ProductView(),
      userController
    );
    const dashboardController = new DashBoardController(new DashBoardView());
    const toggleController = new ToggleController(new ToggleView());
    userController.init();
    recipesController.init();
    toggleController.init();
    dashboardController.init();

    const setNavigationActive = (type) => {
      document
        .querySelector(".navigation__item.active")
        ?.classList.remove("active");

      switch (type) {
        case "users":
          document
            .querySelector(".navigation__item[data-id='users']")
            .classList.add("active");
          urlParams = new URLSearchParams(window.location.search);
          urlParams.set("nav", "users");
          break;
        case "products":
          document.querySelector(".navigation__item[data-id='products']").classList.add("active");
          urlParams = new URLSearchParams(window.location.search);
          urlParams.set("nav", "product");
          break;
        default:
          break;
      }
    };

    delegate(
      document.querySelector(".navigation"),
      ".navigation__item",
      "click",

      (event) => {
        event.preventDefault();
        const type = event.target.closest(".navigation__item").dataset.id;

        setNavigationActive(type);

        if (type === "users") {
          toolEl = document.querySelector(".toolbar__title");
          toolEl.textContent = "User";
        } else {
          toolEl = document.querySelector(".toolbar__title");
          toolEl.textContent = "Products";
        }
        console.log("userController", userController);
        switch (type) {
          case "users":
            userController.handleViewUsers();

            break;
          case "products":
            recipesController.handleViewProducts();
            // TODO: update button add new to enable
            break;
          default:
            break;
        }
      }
    );
  }
});

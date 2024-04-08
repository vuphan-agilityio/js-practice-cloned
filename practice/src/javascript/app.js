import UserModel from "./models/user-model.js";
import UserView from "./view/user-view.js";
import UserController from "./controllers/user-controller.js";
import RecipeView from "./view/recipes-view.js";
import RecipeController from "./controllers/recipes-controller.js";
import RecipeModel from "./models/recipes-model.js";
import { delegate } from "./helpers/index.js";
import AuthenticationController from "./controllers/authentication-controller.js";
import AuthenticationView from "./view/authentication-view.js";
import DashBoardController from "./controllers/dashboard-controller.js";
import DashBoardView from "./view/dashboard-view.js";
import ToggleController from "./controllers/toggle-controller.js";
import ToggleView from "./view/toggle-view.js";

window.addEventListener("load", () => {
  const authenticationController = new AuthenticationController(
    new UserModel(),
    new AuthenticationView()
  );
  authenticationController.init();

  const user = localStorage.getItem("user");
  const pathname = window.location.pathname;
  if (!user && pathname !== "/login") {
    window.location.replace("login");
  }

  if (pathname == "/dashboard.html") {
    const userController = new UserController(new UserModel(), new UserView());
    const recipesController = new RecipeController(
      new RecipeModel(),
      new RecipeView()
    );

    const dashboardController = new DashBoardController(new DashBoardView());
    const toggleController = new ToggleController(new ToggleView());
    userController.init();
    recipesController.init();
    toggleController.init();
    dashboardController.init();

    const setNavigationActive = (type) => {
      document.querySelector(".navigation__item.active") ?.classList.remove("active");
      const newRecipesBtn = document.getElementById("new-recipes");
      switch (type) {
        case "users":
          document.querySelector(".navigation__item[data-id='users']").classList.add("active");
          urlParams = new URLSearchParams(window.location.search);
          urlParams.set("nav", "users");
          newRecipesBtn.classList.add("hide");
          break;
        case "recipes":
          document.querySelector(".navigation__item[data-id='recipes']").classList.add("active");
          urlParams = new URLSearchParams(window.location.search);
          urlParams.set("nav", "recipe");
          newRecipesBtn.classList.remove("hide");
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
          toolEl.textContent = "Recipes";
        }

        switch (type) {
          case "users":
            userController.handleViewUsers();
            break;
          case "recipes":
            recipesController.handleViewRecipes();
            break;
          default:
            break;
        }
      }
    );
  }
});

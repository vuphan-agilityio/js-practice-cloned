import RecipeModel from "./models/recipes-model.js";
import RecipesAppView from "./view/recipes-app/recipes-view.js";
import RecipeController from "./controllers/recipe-app/recipes-controller.js";

window.addEventListener("load", () => {
  const recipeAppController = new RecipeController(
    new RecipeModel(),
    new RecipesAppView()
  );
  recipeAppController.init();
});

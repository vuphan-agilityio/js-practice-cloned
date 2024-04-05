import RecipeDetailController from "./controllers/recipe-detail/recipe-detail-controller.js";
import RecipeDetailView from "./view/recipe-detail-view/recipe-detail-view";
import RecipeModel from "./models/recipes-model.js";

window.addEventListener("load", () => {
  const recipeDetailController = new RecipeDetailController(new RecipeModel(), new RecipeDetailView())
  recipeDetailController.init();
  });

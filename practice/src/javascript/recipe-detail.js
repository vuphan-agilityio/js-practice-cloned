import RecipeDetailController from "./controllers/recipe-detail/recipe-detail-controller.js"
import RecipeDetailView from "./view/recipe-detail-view.js/recipe-detail-view.js"
import RecipeModel from "./models/recipes-model.js";

window.addEventListener("load", () => {
  const recipeDetailController = new RecipeDetailController(
    new RecipeModel(),
    new RecipeDetailView()
  );
  recipeDetailController.init();
});

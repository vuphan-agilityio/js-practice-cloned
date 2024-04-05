import RecipesAppView from "./view/recipes-app/recipes-view";

window.addEventListener("load", () => {
const recipeAppController = new recipeAppController(new RecipesAppView())
recipeAppController.init();
});

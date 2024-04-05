import { renderRecipeDetailTemplate } from "../../templates/recipes.js";

export default class RecipeDetailView {
  constructor() {
  this.recipeDetailEL = document.getElementById("recipe-details")
  }

  renderRecipePageDetail = (recipeItem) => {
    this.recipeDetailEL.innerHTML = renderRecipeDetailTemplate(recipeItem);
  };
}

import { renderRecipeDetailTemplate } from "../../templates/recipes.js";

export default class RecipeDetailView {
  constructor() {
    this.recipeDetailEL = document.getElementById("recipe-details");
  }

  /**
   * The renderRecipePageDetail method renders the details of a recipe on the recipe page.
   * @param {object} recipeItem - The recipe item containing details to be rendered.
   */
  renderRecipePageDetail = (recipeItem) => {
    this.recipeDetailEL.innerHTML = renderRecipeDetailTemplate(recipeItem);
  };
}

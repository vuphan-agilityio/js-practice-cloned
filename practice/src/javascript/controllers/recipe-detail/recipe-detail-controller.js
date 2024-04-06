import RecipeService from "../../services/reicpes-service";

export default class RecipeDetailController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  init = async () => {
    this.urlParams = new URLSearchParams(window.location.search);
    const { result } = await this.getRecipeDetail(this.urlParams.get("id"));
    this.view.renderRecipePageDetail(result[0]);
  };

  /**
   * The getRecipeDetail function fetches detailed information about a recipe based on its ID.
   * @param {string} id - The ID of the recipe to fetch details for.
   * @returns {Promise<object>} - A Promise that resolves to the detailed information of the recipe.
   */
  getRecipeDetail = async (id) => {
    return await RecipeService.fetchRecipeDetail(id);
  };
}

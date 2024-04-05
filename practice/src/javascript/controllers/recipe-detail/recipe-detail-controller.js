import RecipeService from "../../services/reicpes-service";

export default class RecipeDetailController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  init = async () => {
    this.urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams", this.urlParams.get("id"));
    const { result } = await this.getRecipeDetail(this.urlParams.get("id"));
    console.log("result: ", result[0]);
    this.view.renderRecipePageDetail(result[0]);
  };

  getRecipeDetail = async (id) => {
    return await RecipeService.fetchRecipeDetail(id);
  }
}

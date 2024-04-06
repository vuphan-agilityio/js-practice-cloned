import RecipeService from "../../services/reicpes-service.js";

export default class RecipeController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init = async () => {
    this.handleViewRecipeHome();
  };

  handleViewRecipeHome = async () => {
    const {data} = await this.getRecipes();
    this.model.setRecipes(data);
    this.view.renderRecipe(data);
    this.view.renderDeliciousRecipe(data.filter(item => item.collection_id === 1).slice(0,3));
    this.view.renderSweetRecipe(data.filter(item => item.collection_id === 2).slice(0,3));
    console.log("data-controller", data);
  };

  // handleRecipePageDetail = async () => {
  //   const  {data} = await this.getRecipes();
  //   this.model.setRecipes(data);
  //   this.view.renderRecipePageDetail(data);
  //   console.log("data-controller", data);
  // };

  // handleShowPageRecipeDetails = (recipeId) => {
  //   console.log("recipeId", recipeId);
  //   const recipe = this.model.getRecipeById(recipeId);
  //   this.view.showPageRecipeDetails(recipe);
  // };

  // showPageRecipeDetails

   /**
   * The getRecipes function retrieves a list of recipes from the server through UserService.
   *
   * @returns {Promise} - A Promise containing recipe list data from the server.
   */
   getRecipes = async () => {
    return await RecipeService.fetchRecipes();
  };
}

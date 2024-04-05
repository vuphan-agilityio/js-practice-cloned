import RecipeService from "../../services/recipe-service";

export default class RecipesAppController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init = async () => {

    this.view.bindCallback("displayPanel");
    // this.view.bindCallback("addRecipe", this.handleAddRecipe);
    this.view.bindCallback("backToggle");
  };


  handleViewRecipeHome = async () => {
    const { data } = await this.getRecipes();
    this.model.setRecipes(data);
    this.view.renderRecipeHomeTemplate(data);
    console.log("data-controller", data);
  };

   /**
   * The getRecipes function retrieves a list of recipes from the server through UserService.
   *
   * @returns {Promise} - A Promise containing recipe list data from the server.
   */
   getRecipes = async () => {
    return await RecipeService.fetchRecipes();
  };
}

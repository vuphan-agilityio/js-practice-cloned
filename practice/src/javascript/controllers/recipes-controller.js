import RecipeService from "../services/reicpes-service.js";

export default class RecipeController {
  constructor(model, view, userController) {
    this.model = model;
    this.view = view;
    this.userController = userController;
  }
  init = async () => {
    this.view.bindCallback("editRecipe", this.handleEditRecipe);
    this.view.bindCallback("deleteRecipe", this.handleDeleteRecipe);
    this.view.bindCallback("addRecipe", this.handleAddRecipe);
  };

  /**
   * The handleViewRecipes function displays the recipe list on the interface.
   */
  handleViewRecipes = async () => {
    const { data } = await this.getRecipes();
    this.model.setRecipes(data);
    this.view.renderTableRecipes(data);
    this.view.bindCallback("recipeRowClick", this.handleShowRecipeDetails);
  };

  handleViewRecipeHome = async () => {
    const { data } = await this.getRecipes();
    this.model.setRecipes(data);
    this.view.renderListRecipesTemplate(data);
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

  handleShowRecipeDetails = (recipeId) => {
    console.log("recipeId", recipeId);
    const recipe = this.model.getRecipeById(recipeId);
    this.view.showRecipeDetails(recipe);
  };

  handleDeleteRecipe = async (recipeId) => {
    await RecipeService.deleteRecipe(recipeId);
    alert("Delete successfully!");
    this.handleViewRecipes();
  };

  handleEditRecipe = async (recipeImage, recipeName, recipeId) => {
    try {
      const recipe = this.model.getRecipeById(recipeId);
      await RecipeService.editRecipe(recipeId, {
        ...recipe,
        name: recipeName,
        imageURL: recipeImage,
      });
      alert("Username updated successfully!");
      this.handleViewRecipes();
    } catch (error) {
      alert("Failed to update user");
    }
  };

  handleAddRecipe = async ({
    name,
    image,
    category,
    creator,
    ratings,
    description,
    instruction,
    ingredient,
    nutrition,
    createdAt,
  }) => {
    await RecipeService.createRecipe({
      name,
      image,
      category,
      creator,
      ratings,
      description,
      instruction,
      ingredient,
      nutrition,
    });
    this.handleViewRecipes();
  };
}

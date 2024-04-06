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

  /**
   * The getRecipes function retrieves a list of recipes from the server through UserService.
   *
   * @returns {Promise} - A Promise containing recipe list data from the server.
   */
  getRecipes = async () => {
    return await RecipeService.fetchRecipes();
  };

  /**
   * The handleShowRecipeDetails function displays details of a recipe.
   * @param {string} recipeId - The ID of the recipe to display details.
   */
  handleShowRecipeDetails = (recipeId) => {
    const recipe = this.model.getRecipeById(recipeId);
    this.view.showRecipeDetails(recipe);
  };

  /**
   * The handleDeleteRecipe function deletes a recipe.
   * @param {string} recipeId - The ID of the recipe to delete.
   */
  handleDeleteRecipe = async (recipeId) => {
    await RecipeService.deleteRecipe(recipeId);
    alert("Delete successfully!");
    this.handleViewRecipes();
  };

  /**
   * The handleEditRecipe function edits a recipe.
   * @param {string} recipeImage - The image URL of the recipe.
   * @param {string} recipeName - The name of the recipe.
   * @param {string} recipeId - The ID of the recipe to edit.
   */
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

  /**
   * The handleAddRecipe function adds a new recipe.
   * @param {object} recipeData - An object containing recipe details.
   * @param {string} recipeData.name - The name of the recipe.
   * @param {string} recipeData.image - The image URL of the recipe.
   * @param {string} recipeData.category - The category of the recipe.
   * @param {string} recipeData.creator_id - The creator_id of the recipe.
   * @param {number} recipeData.ratings - The ratings of the recipe.
   * @param {string} recipeData.description - The description of the recipe.
   * @param {string} recipeData.instruction - The instruction of the recipe.
   * @param {string} recipeData.ingredient - The ingredients of the recipe.
   * @param {string} recipeData.nutrition - The nutrition facts of the recipe.
   * @param {string} recipeData.createdAt - The creation date of the recipe.
   */
  handleAddRecipe = async ({
    name,
    image,
    category,
    creator_id,
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
      creator_id,
      ratings,
      description,
      instruction,
      ingredient,
      nutrition,
    });
    this.handleViewRecipes();
  };
}

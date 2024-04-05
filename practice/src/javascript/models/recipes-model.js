export default class RecipeModel {
  constructor(
    name,
    description,
    ingredients,
    intruction,
    nutrition,
    creator,
    category,
    id,
    role,
    imageURL,
    ratings,
    createdAt
  ) {
    this.recipes = [];
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.intruction = intruction;
    this.nutrition = nutrition;
    this.creator = creator;
    this.category = category;
    this.id = id;
    this.role = role;
    this.imageURL = imageURL;
    this.ratings = ratings;
    this.createdAt = createdAt;
  }

  /**
   * The setRecipes function updates recipes data in the application model.
   * @param {array} data - An array containing new recipes data
   */
  setRecipes = (data) => {
    this.recipes = data;
  };

  /**
   * The getRecipeById function retrieves a recipes from the application model based on its ID.
   * @param {string} id - The ID of the recipes to retrieve
   * @returns {object|undefined} - Therecipes object if found, or undefined if not found
   */
  getRecipeById = (id) => {
    return this.recipes.find((recipes) => recipes.id === id);
  };
}

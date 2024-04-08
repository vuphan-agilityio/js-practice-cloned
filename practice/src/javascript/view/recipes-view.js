import { bindEvent, delegate } from "../helpers";
import {
  renderRecipeTableTemplate,
  renderRecipeDetails,
  renderListRecipesTemplate,
} from "../templates/recipes";

export default class RecipeView {
  constructor() {
    // Add recipe
    this.selectAddEl = document.getElementById("form-add-recipes");
    this.nameEl = document.getElementById("input_name");
    this.image = document.getElementById("input_image");
    this.desEL = document.getElementById("input_description");
    this.categoryEl = document.getElementById("input_category");
    this.creatorEl = document.getElementById("input_creator");
    this.ratingEl = document.getElementById("input_ratings");
    this.instructEL = document.getElementById("input_instruction");
    this.ingredientEL = document.getElementById("input_ingredients");
    this.nutriEL = document.getElementById("input_nutrition");

    this.tableWrapperEl = document.getElementById("table-wrapper");
    this.panelEl = document.querySelector(".panel");
    this.userDetailsContainerEl = document.querySelector(".panel");
    this.recipesListEl = document.querySelector(".recipes__list");
  }

  bindCallback = (event, handler) => {
    switch (event) {
      case "signIn":
        bindEvent(this.signInFormEl, "submit", this.signIn(handler));
        break;
      case "signUp":
        bindEvent(this.signUpFormEl, "submit", this.signUp(handler));
        break;
      case "navigationItem":
        delegate(
          this.navigationEl,
          ".navigation__item",
          "click",
          this.navToggle(handler)
        );
        break;
      case "addRecipe":
        bindEvent(this.selectAddEl, "submit", (event) => {
          event.preventDefault();
          this.addRecipe(handler);
        });
        break;
      case "recipeRowClick":
        this.tBodyEl = document.querySelector(".table-body__recipe");
        delegate(
          this.tBodyEl,
          ".table__row",
          "click",
          this.showRecipeById(handler)
        );
        break;
      case "editRecipe":
        this.sidebarDetailEl = document.getElementById("panel-details");
        delegate(
          this.sidebarDetailEl,
          ".btn-edit-recipes",
          "click",
          this.editRecipe(handler)
        );
        break;
      case "deleteRecipe":
        this.sidebarDetailEl = document.getElementById("panel-details");
        delegate(
          this.sidebarDetailEl,
          ".btn-delete-recipes",
          "click",
          this.deleteRecipe(handler)
        );
        break;
      default:
        break;
    }
  };

  /**
   * The showRecipeById function extracts the ID of a recipe from a DOM element and invokes a handler function.
   * @param {function} handler - The handler function to be invoked with the recipe ID.
   * @param {Event} event - The event triggered by interacting with a DOM element.
   */
  showRecipeById = (handler) => (event) => {
    const recipesId = event.target.closest(".table__row").dataset.id;
    handler(recipesId);
  };

  showRecipeDetails = ({
    id,
    imageURL,
    name,
    category,
    creator,
    ratings,
    description,
    instruction,
    ingredient,
    nutrition,
    createdAt,
  }) => {
    this.panelEl.innerHTML = renderRecipeDetails({
      id,
      imageURL,
      name,
      category,
      creator,
      ratings,
      description,
      instruction,
      ingredient,
      nutrition,
      createdAt,
    });
    this.userDetailsContainerEl.classList.add("show-panel");
  };

  /**
   * The renderTableRecipes function renders the recipes data table to the user interface.
   * @param {Array} data - Array containing recipes information.
   */
  renderTableRecipes = (data) => {
    this.tableWrapperEl.innerHTML = renderRecipeTableTemplate(data);
  };

  /**
   * The deleteRecipe function extracts the ID of a recipe from a DOM element and invokes a handler function to delete the recipe.
   * @param {function} handler - The handler function to be invoked with the recipe ID for deletion.
   * @param {Event} event - The event triggered by interacting with a DOM element.
   */
  deleteRecipe = (handler) => (event) => {
    const recipesId = document.querySelector(".panel__confirm").getAttribute("data-id");
    handler(recipesId);
  };

  /**
   * The editRecipe function extracts information from input fields and invokes a handler function to edit a recipe.
   * @param {function} handler - The handler function to be invoked with the updated recipe information.
   * @param {Event} event - The event triggered by interacting with a DOM element.
   */
  editRecipe = (handler) => (event) => {
    const recipesImage = document.getElementById("image-input").value.trim();
    const recipesName = document.getElementById("recipes-name-input").value.trim();
    const recipesCategory = document.getElementById("recipe-category-input").value.trim();
    const recipesCreator = document.getElementById("ecipe-creator-input").value.trim();
    const recipesRatings = document.getElementById("recipe-ratings-input").value.trim();
    const recipesDes = document.getElementById("recipe-description-input").value.trim();
    const recipesId = document.querySelector(".panel__confirm").getAttribute("data-id");
    handler(recipesImage, recipesName, recipesId, recipesCategory, recipesCreator, recipesRatings, recipesDes);
  };

  /**
   * The addRecipe function extracts information from input fields and invokes a handler function to add a new recipe.
   * @param {function} handler - The handler function to be invoked with the new recipe information.
   */
  addRecipe = (handler) => {
    handler({
      name: this.nameEl.value,
      image: this.image.value,
      category: this.categoryEl.value,
      creator: this.creatorEl.value,
      ratings: this.ratingEl.value,
      description: this.desEL.value,
    });
  };
}

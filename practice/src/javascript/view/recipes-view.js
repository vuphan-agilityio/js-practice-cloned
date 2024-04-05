import { bindEvent, delegate } from "../helpers";
import {
  renderRecipeTableTemplate,
  renderRecipeDetails,
  renderRecipeHomeTemplate,
} from "../templates/recipes";

export default class RecipeView {
  constructor() {
    // Add recipe
    this.selectAddEl = document.getElementById("form-add-recipe");
    this.nameEl = document.getElementById("input_name");
    this.image = document.getElementById("input_image");
    this.desEL = document.getElementById("recipe-description-input");
    this.categoryEl = document.getElementById("recipe-category-input");
    this.creatorEl = document.getElementById("recipe-creator-input");
    this.ratingEl = document.getElementById("recipe-ratings-input");
    this.instructEL = document.getElementById("recipe-instruction-input");
    this.ingredientEL = document.getElementById("recipe-ingredients-input");
    this.nutriEL = document.getElementById("recipe-nutrition-input");

    this.tableWrapperEl = document.getElementById("table-wrapper");

    // Render recipes
    // this.recipePageEl = document.querySelector(".recipe-page");
    // this.recipesListEl = document.querySelector(".recipes__list[data-id='recipes']");
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
        ); // Toggle icon recipess
        break;
      case "addRecipe":
        bindEvent(this.selectAddEl, "submit", this.addRecipe(handler)); // Toggle icon recipes
        break;
      case "recipesRowClick":
        this.tBodyEl = document.querySelector(".table-body__recipes");
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

  showRecipeById = (handler) => (event) => {
    const recipesId = event.target.closest(".table__row").dataset.id;
    handler(recipesId);
  };

  showRecipeById = (handler) => (event) => {
    const precipesId = event.target.closest(".table__row").dataset.id;
    handler(recipesId);
  };

  showRecipeDetails = ({
    id,
    imageUrl,
    name,
    category,
    creator,
    ratings,
    description,
    instruction,
    ingredients,
    nutrition,
    createdAt
  }) => {
    this.panelEl.innerHTML = renderRecipeDetails({
      id,
      imageUrl,
      name,
      category,
      creator,
      ratings,
      description,
      instruction,
      ingredients,
      nutrition,
      createdAt
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

  renderRecipe = (data) => {
    // this.recipePageEl.innerHTML = renderRecipeHomeTemplet(data);
    this.recipesListEl.innerHTML = renderRecipeHomeTemplate(data);
    console.log("data", data);
  };

  deleteRecipe = (handler) => (event) => {
    const recipesId = document
      .querySelector(".panel__confirm")
      .getAttribute("data-id");
    handler(recipesId);
  };

  editRecipe = (handler) => (event) => {
    const recipesImage = document.getElementById("image-input").value.trim();
    const recipesName = document
      .getElementById("recipes-name-input")
      .value.trim();
    const recipesId = document
      .querySelector(".panel__confirm")
      .getAttribute("data-id");
    handler(recipesImage, recipesName,recipesId);
  };

  addRecipe = (handler) => {
    return (event) => {
      event.preventDefault();
      handler({
        name: this.nameEl.value,
        image: this.image.value,
        category: this.categoryEl.value,
        creator: this.creatorEl.value,
        ratings: this.ratingEl.value,
        description: this.desEL.value,
        instruction: this.instructEL.value,
        ingredients: this.ingredientEL.value,
        nutrition: this.nutriEL.value,
        createdAt: this.createdAt.value
      });
    };
  };
}

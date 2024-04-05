import { renderListRecipesTemplate } from "../../templates/recipes.js";
import { bindEvent, delegate } from "../../helpers";

export default class RecipesAppView {
  constructor() {
    // Render recipes
    this.recipesListEl = document.getElementById("latest-recipes");
  }

  bindCallback = (event, handler) => {
    switch (event) {
      case "recipeClick":
        console.log("entered bind call back event before delegating");
        delegate(
          this.recipesListEl,
          ".recipes__food",
          "click",
          handler
        );
        break;
      default:
        break;
    }
  };

  redirectPage = (page) => {
    window.location.replace(page);
  };

  navigateRecipe = (handler) => {
    console.log("navigateeee");
    // this.redirectPage("recipe.html")
  }

  renderRecipe = (data) => {
    // this.recipePageEl.innerHTML = renderRecipeHomeTemplet(data);
    this.recipesListEl.innerHTML = renderListRecipesTemplate(data);
  };



  showRecipeById = (handler) => (event) => {
    const recipesId = event.target.closest(".latest-recipes").dataset.id;
    handler(recipesId);
    console.log("(recipesId)",recipesId)
  };

  showPageRecipeDetails = ({
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
}

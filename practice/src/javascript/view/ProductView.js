import { bindEvent, delegate } from "../helpers";
import {
  renderProductTableTemplate,
  renderProductDetails,
  renderProductHomeTemplate,
} from "../templates/product";

export default class ProductView {
  constructor() {
    // Add product
    this.selectAddEl = document.getElementById("form-add-product");
    this.nameEl = document.getElementById("input_name");
    this.image = document.getElementById("input_image");
    this.desEL = document.getElementById("product-description-input");
    this.categoryEl = document.getElementById("product-category-input");
    this.creatorEl = document.getElementById("product-creator-input");
    this.ratingEl = document.getElementById("product-ratings-input");
    this.instructEL = document.getElementById("product-instruction-input");
    this.ingredientEL = document.getElementById("product-ingredients-input");
    this.nutriEL = document.getElementById("product-nutrition-input");

    this.tableWrapperEl = document.getElementById("table-wrapper");

    // Render recipes
    // this.recipePageEl = document.querySelector(".recipe-page");
    // this.recipesListEl = document.querySelector(".recipes__list[data-id='product']");
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
        ); // Toggle icon products
        break;
      case "addProduct":
        bindEvent(this.selectAddEl, "submit", this.addProduct(handler)); // Toggle icon products
        break;
      case "productRowClick":
        this.tBodyEl = document.querySelector(".table-body__product");
        delegate(
          this.tBodyEl,
          ".table__row",
          "click",
          this.showProductById(handler)
        );
        break;
      case "editProduct":
        this.sidebarDetailEl = document.getElementById("panel-details");
        delegate(
          this.sidebarDetailEl,
          ".btn-edit-product",
          "click",
          this.editProduct(handler)
        );
        break;
      case "deleteProduct":
        this.sidebarDetailEl = document.getElementById("panel-details");
        delegate(
          this.sidebarDetailEl,
          ".btn-delete-product",
          "click",
          this.deleteProduct(handler)
        );
        break;
      default:
        break;
    }
  };

  showProductDetails = ({
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
    this.panelEl.innerHTML = renderProductDetails({
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

  showProductById = (handler) => (event) => {
    const productId = event.target.closest(".table__row").dataset.id;
    handler(productId);
  };

  showProductById = (handler) => (event) => {
    const productId = event.target.closest(".table__row").dataset.id;
    handler(productId);
  };

  /**
   * The renderTableProducts function renders the product data table to the user interface.
   * @param {Array} data - Array containing product information.
   */
  renderTableProducts = (data) => {
    this.tableWrapperEl.innerHTML = renderProductTableTemplate(data);
  };

  renderProduct = (data) => {
    // this.recipePageEl.innerHTML = renderProductHomeTemplet(data);
    this.recipesListEl.innerHTML = renderProductHomeTemplate(data);
    console.log("data", data);
  };

  deleteProduct = (handler) => (event) => {
    const productId = document
      .querySelector(".panel__confirm")
      .getAttribute("data-id");
    handler(productId);
  };

  editProduct = (handler) => (event) => {
    const productImage = document.getElementById("image-input").value.trim();
    const productName = document
      .getElementById("product-name-input")
      .value.trim();
    const productId = document
      .querySelector(".panel__confirm")
      .getAttribute("data-id");
    handler(productImage, productName, productId);
  };

  addProduct = (handler) => {
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

      });
    };
  };
}

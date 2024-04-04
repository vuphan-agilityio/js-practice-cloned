import ProductService from "../../services/ProductService.js";

export default class RecipesAppController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init = async () => {

    this.view.bindCallback("displayPanel");
    // this.view.bindCallback("addProduct", this.handleAddProduct);
    this.view.bindCallback("backToggle");
  };


  handleViewProductHome = async () => {
    const { data } = await this.getProducts();
    this.model.setProducts(data);
    this.view.renderProductHomeTemplate(data);
    console.log("data-controller", data);
  };

   /**
   * The getProducts function retrieves a list of products from the server through UserService.
   *
   * @returns {Promise} - A Promise containing product list data from the server.
   */
   getProducts = async () => {
    return await ProductService.fetchProducts();
  };
}

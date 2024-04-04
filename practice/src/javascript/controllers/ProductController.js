import ProductService from "../services/ProductService.js";

export default class ProductController {
  constructor(model, view, userController) {
    this.model = model;
    this.view = view;
    this.userController = userController;
  }
  init = async () => {
    this.view.bindCallback("editProduct", this.handleEditProduct);
    this.view.bindCallback("deleteProduct", this.handleDeleteProduct);
    this.view.bindCallback("addProduct", this.handleAddProduct);
  };

  /**
   * The handleViewProducts function displays the product list on the interface.
   */
  handleViewProducts = async () => {
    const { data } = await this.getProducts();
    console.log("data", data);
    this.model.setProducts(data);
    this.view.renderTableProducts(data);
    this.view.bindCallback("productRowClick", this.handleShowProductDetails);
    console.log("data", data);
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

  handleShowProductDetails = (productId) => {
    console.log("productId", productId);
    const product = this.model.getProductById(productId);
    this.view.showProductDetails(product);
  };

  handleDeleteProduct = async (productId) => {
    await ProductService.deleteProduct(productId);
    alert("Delete successfully!");
    this.handleViewProducts();
  };

  handleEditProduct = async (productImage, productName, productId) => {
    try {
      const product = this.model.getProductById(productId);
      await ProductService.editProduct(productId, {
        ...product,
        name: productName,
        imageUrl: productImage,
      });
      alert("Username updated successfully!");
      this.handleViewProducts();
    } catch (error) {
      alert("Failed to update user");
    }
  };

  handleAddProduct = async ({
    name,
    image,
    category,
    creator,
    ratings,
    description,
    instruction,
    ingredients,
    nutrition,
    createdAt,
  }) => {
    await ProductService.createProduct({
      name,
      image,
      category,
      creator,
      ratings,
      description,
      instruction,
      ingredients,
      nutrition,
      createdAt,
    });
    this.handleViewProducts();
  };
}

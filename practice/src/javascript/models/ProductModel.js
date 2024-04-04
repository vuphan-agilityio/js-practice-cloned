export default class ProductModel {
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
    this.products = [];
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
   * The setProducts function updates product data in the application model.
   * @param {array} data - An array containing new product data
   */
  setProducts = (data) => {
    this.products = data;
  };

  /**
   * The getProductById function retrieves a product from the application model based on its ID.
   * @param {string} id - The ID of the product to retrieve
   * @returns {object|undefined} - The product object if found, or undefined if not found
   */
  getProductById = (id) => {
    return this.products.find((product) => product.id === id);
  };
}

/**
 * The productRowTemplateProduct function receives an array of data containing product information and returns an HTML string representing the rows of the product table.
 * @param {Array} data - Array containing product information.
 * @returns {string} - HTML string representing the rows of the products table.
 */
const productRowTemplateProduct = (data) => {
  return data.length ? data.map((item) => {
    return `
    <tr class="table__row product_item" data-id=${item.id}>
      <td class="table__row__cell">
        <img src=${item.imageUrl} width="100px" height="100px"style="border-radius: 50%;"/>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.name}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.category}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.creator}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.ratings}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.description}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.instructions}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.ingredients}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.nutrition}</p>
      </td>
    </tr>
  `;
  }).join("") : "";
};

/**
 * The renderProductTableTemplate function receives an array of data containing product information and returns an HTML string representing the product data table.
 * @param {Array} data - Array containing product information.
 * @returns {string} - HTML string representing the product data table.
 */
const renderProductTableTemplate = (data) => {
  return `
    <table class="table__wrapper toolbar__title">
      <thead class="table__head">
        <tr class="table__header">
          <th class="table__header__cell">Image</th>
          <th class="table__header__cell table-product__cell">Name</th>
          <th class="table__header__cell">Category</th>
          <th class="table__header__cell">Creator</th>
          <th class="table__header__cell">Ratings</th>
          <th class="table__header__cell">Description</th>
          <th class="table__header__cell">Instruction</th>
          <th class="table__header__cell">Ingredients</th>
          <th class="table__header__cell">Nutrition</th>
        </tr>
      </thead>

      <tbody class="table-body__product">
        ${productRowTemplateProduct(data)}
      </tbody>
    </table>
  `
}

const renderProductDetails = (data) => {
  return `
    <div class="panel__edit">
      <span class="panel__icon-back drawer__user-icon" id="icon-back"></span>
      <button class="btn__general">General</button>
    </div>

    <div class="panel__confirm" data-id=${data.id}>
      <button class="btn__delete btn__save btn-delete-product" id="delete-product">Delete</button>
      <button class="btn__save btn-edit-product" id="save-edit">Save</button>
    </div>

    <forrm class="panel__edit-profile">
      <div class="panel__item">
        <label class="panel__label">Image</label>
        <input id="image-input" type="text" class="panel__input" value=${data.imageUrl}>
      </div>

      <div class="panel__item">
        <label class="panel__label">Name</label>
        <input id="product-name-input" type="text" class="panel__input" value=${data.name}>
      </div>

      <div class="panel__item">
        <label class="panel__label" for="product-category-input">Category</label>
        <select id="product-category-input" class="panel__input" value=${data.category}>
          <option value="">Please select</option>
          <option value="Pasta">Pasta</option>
          <option value="Pizza">Pizza</option>
          <option value="Vegan">Vegan</option>
          <option value="Desserts">Desserts</option>
          <option value="Smoothies">Smoothies</option>
          <option value="Breakfast">Breakfast</option>
        </select>
      </div>

      <div class="panel__item">
        <label class="panel__label">Creator</label>
        <input id="product-creator-input" type="text" class="panel__input" value=${data.creator}>
      </div>

      <div class="panel__item">
        <label class="panel__label" for="product-ratings-input">Ratings</label>
        <select id="product-ratings-input" class="panel__input" value=${data.ratings}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div class="panel__item">
        <label class="panel__label">Description</label>
        <input id="product-description-input" type="text" class="panel__input" value=${data.description}>
      </div>

      <div class="panel__item">
        <label class="panel__label">Instruction</label>
        <input id="product-instruction-input" type="text" class="panel__input" value=${data.instruction}>
      </div>

      <div class="panel__item">
        <label class="panel__label">Ingredients</label>
        <input id="product-ingredients-input" type="text" class="panel__input" value=${data.ingredients}>
      </div>

      <div class="panel__item">
        <label class="panel__label">Nutrition</label>
        <input id="product-nutrition-input" type="text" class="panel__input" value=${data.nutrition}>
      </div>
    </forrm>
  `
}

export { renderProductTableTemplate, renderProductDetails };

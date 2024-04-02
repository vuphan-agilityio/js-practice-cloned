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
        <img src=${item.imageUrl} width="50px" height="50px"/>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.name}</p>
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
    </forrm>
  `
}

export { renderProductTableTemplate, renderProductDetails };

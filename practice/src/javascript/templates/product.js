/**
 * The productRowTemplateProduct function receives an array of data containing product information and returns an HTML string representing the rows of the product table.
 * @param {Array} data - Array containing product information.
 * @returns {string} - HTML string representing the rows of the products table.
 */
const productRowTemplateProduct = (data) => {
  return data.length ? data.map((item) => {
    return `
    <tr class="table__row">
      <td class="table__row__cell">
        <p class="table__title">${item.name}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.creator}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.collection}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.category}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.nutrition}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.description}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.ingredients}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.intruction}</p>
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
          <th class="table__header__cell table-product__cell">Name</th>
          <th class="table__header__cell">Creator</th>
          <th class="table__header__cell">Collection</th>
          <th class="table__header__cell">Category</th>
          <th class="table__header__cell">Nutrition</th>
          <th class="table__header__cell">Description</th>
          <th class="table__header__cell">Ingredients</th>
          <th class="table__header__cell">Intruction</th>
        </tr>
      </thead>

      <tbody class="table-body__product">
        ${productRowTemplateProduct(data)}
      </tbody>
    </table>
  `
}

export { renderProductTableTemplate };

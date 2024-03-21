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

export { productRowTemplateProduct };

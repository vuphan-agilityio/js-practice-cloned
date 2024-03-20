const userRowTemplate = (data) => {
  return data.length ? data.map((item) => {
    return `
    <tr class="table__row">
      <td class="table__row__cell">
        <p class="table__title">${item.username}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.email}</p>
      </td>
    </tr>
  `;
  }).join("") : "";
};

export { userRowTemplate };

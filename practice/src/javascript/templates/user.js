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

const renderUserTableTemplate = (data) => {
  return `
    <table class="table__wrapper toolbar__title">
      <thead class="table__head">
        <tr class="table__header">
          <th class="table__header__cell">Full name</th>
          <th class="table__header__cell">Email</th>
        </tr>
      </thead>

      <tbody class="table-body">
        ${userRowTemplate(data)}
      </tbody>
    </table>
  `
};

export { renderUserTableTemplate };

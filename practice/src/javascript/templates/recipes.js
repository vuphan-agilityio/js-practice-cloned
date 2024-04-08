/**
 * The recipeRowTemplateRecipe function receives an array of data containing recipe information and returns an HTML string representing the rows of the recipe table.
 * @param {Array} data - Array containing recipe information.
 * @returns {string} - HTML string representing the rows of the recipes table.
 */
const recipeRowTemplateRecipe = (data) => {
  return data.length ? data.map((item) => {
    return `
    <tr class="table__row recipe_item" data-id=${item.id}>
      <td class="table__row__cell">
        <img src=${item.imageURL} width="100px" height="100px"style="border-radius: 50%;"/>
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
        <p class="table__title">${item.createdAt}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.ratings}</p>
      </td>
      <td class="table__row__cell">
        <p class="table__title">${item.description}</p>
      </td>
    </tr>
  `;}).join("") : "";
};

/**
 * The renderRecipeTableTemplate function receives an array of data containing recipe information and returns an HTML string representing the recipe data table.
 * @param {Array} data - Array containing recipe information.
 * @returns {string} - HTML string representing the recipe data table.
 */
const renderRecipeTableTemplate = (data) => {
  return `
    <table class="table__wrapper toolbar__title">
      <thead class="table__head">
        <tr class="table__header">
          <th class="table__header__cell">Image</th>
          <th class="table__header__cell table-recipe__cell">Name</th>
          <th class="table__header__cell">Category</th>
          <th class="table__header__cell">Creator</th>
          <th class="table__header__cell">createdAt</th>
          <th class="table__header__cell">Ratings</th>
          <th class="table__header__cell">Description</th>
        </tr>
      </thead>

      <tbody class="table-body__recipe">
        ${recipeRowTemplateRecipe(data)}
      </tbody>
    </table>
  `;
};

const renderRecipeDetails = (data) => {
  return `
    <div class="panel__edit">
      <span class="panel__icon-back drawer__user-icon" id="icon-back"></span>
      <button class="btn__general">General</button>
    </div>

    <div class="panel__confirm" data-id=${data.id}>
      <button class="btn__delete btn__save btn-delete-recipe" id="delete-recipe">Delete</button>
      <button class="btn__save btn-edit-recipe" id="save-edit">Save</button>
    </div>

    <form class="panel__edit-profile">
      <div class="panel__item">
        <label class="panel__label">Image</label>
        <input id="image-input" type="text" class="panel__input" value=${data.imageURL}>
      </div>

      <div class="panel__item">
        <label class="panel__label">Name</label>
        <input id="recipe-name-input" type="text" class="panel__input" value=${data.name}>
      </div>

      <div class="panel__item">
        <label class="panel__label" for="recipe-category-input">Category</label>
        <select id="recipe-category-input" class="panel__input" value=${data.category}>
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
        <input id="recipe-creator-input" type="text" class="panel__input" value=${data.creator}>
      </div>

      <div class="panel__item">
        <label class="panel__label" for="recipe-ratings-input">Ratings</label>
        <select id="recipe-ratings-input" class="panel__input" value=${data.ratings}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div class="panel__item">
        <label class="panel__label">Description</label>
        <input id="recipe-description-input" type="text" class="panel__input" value=${data.description}>
      </div>
    </form>
  `;
};

const renderListRecipesTemplate = (data) => {
  return data.length ? data.map((item) => {
     return `
      <a href="recipe.html?id=${item.id}">
        <li class="recipes__food" data-id=${item.id}>
          <article class="card">
            <img class="card__image" src="${item.imageURL}"
              alt="Pictire cashew-vegan-rice" />
            <p class="card__name recipes__name">${item.name}</p>
          </article>
        </li>
       </a>
    `;}).join("") : "";
};

const renderRecipeDetailTemplate = (recipeItem) => {
  return `
  <div class="banner__introduce recipe-pages__introduce">
          <div class="recipe-pages__introduce-wrapper">
            <img src="./assets/images/banner/arrows-up.svg" alt="Arrow up" />
            <p class="recipe-pages__estimate">85% would make this again</p>
          </div>
          <div class="recipe-pages__introduce-wrapper">
            <span class="recipe-pages__icon-upload recipe-pages__icon"></span>
            <span class="recipe-pages__icon-save recipe-pages__icon"></span>
          </div>
        </div>

        <article class="recipes-detail">
          <h4 class="recipes-detail__title">${recipeItem.name}</h4>
          <div class="recipes-detail__info">
            <ul class="recipes-detail__item-info">
              <li class="recipes-detail__user">
                <span class="recipes-detail__icon-avata recipes-detail__icon"></span>
                <p class="recipes-detail__name">${recipeItem.creator}</p>
              </li>
              <li class="recipes-detail__user">
                <span class="recipes-detail__icon-date recipes-detail__icon"></span>
                <p class="recipes-detail__name">${recipeItem.createdAt}</p>
              </li>
              <li class="recipes-detail__user">
                <span class="recipes-detail__icon-comment  recipes-detail__icon"></span>
                <p class="recipes-detail__name">25</p>
              </li>
            </ul>
            <div class="card__rating">${renderRating(recipeItem.ratings)}
            </div>
          </div>
          <p class="recipes-detail__desc">${recipeItem.description}</p>
          <img class="recipes-detail__img-banner" src=${recipeItem.imageURL}
            alt="Picture banner recipe pages" />
        </article>

        <ul class="recipe-pages__custom">
          <li class="recipe-pages__prep-time">
            <p class="recipe-pages__label">PREP TIME</p>
            <P class="recipe-pages__value">15 MIN</P>
          </li>
          <li class="recipe-pages__prep-time">
            <p class="recipe-pages__label">PREP TIME</p>
            <P class="recipe-pages__value">15 MIN</P>
            <span class="icon-edit"></span>
          </li>
          <li class="recipe-pages__prep-time">
            <p class="recipe-pages__label">SERVINGS</p>
            <P class="recipe-pages__value">4 PEOPLE
              <span class="recipe-pages__icon-edit recipe-pages__icon"></span>
            </P>
          </li>
          <li class="recipe-pages__prep-time">
            <span class="recipe-pages__icon-print recipe-pages__icon"></span>
          </li>
        </ul>
        <div class="recipe-pages__content">
          <div class="recipe-pages__wapper">
              ${recipeItem.ingredient}
              ${recipeItem.nutrition}
          </div>
          ${recipeItem.instruction}
        </div>
   `;
};

const renderRating = (ratings) => {
  let rating = "";
  for (let i = 0; i < ratings; i++) {
    rating += '<span class="card__rating-star"></span>';
  }
  return rating;
};

const renderListRecipesByCollectionTemplate = (data) => {
  return data.length ? data.map((item) => {
    return `
    <a href="recipe.html?id=${item.id}">
      <li class="delicious__item">
        <article class="card">
          <img class="card__image delicious__image"
            src="${item.imageURL}"
              alt="Picture spinach-and-cheese-pasta" />
          <div class="card__rating">${renderRating(item.ratings)}</div>
          <p class="card__name delicious__name-food">${item.name}</p>
        </article>
      </li>
    </a>
    `;
    }).join("") : "";
};

const renderListRecipesBySweetTemplate = (data) => {
  return data.length ? data.map((item) => {
    return `
    <a href="recipe.html?id=${item.id}">
      <li class="delicious__item">
        <article class="card">
          <img class="card__image delicious__image" src="${item.imageURL}"
           alt="Picture spinach-and-cheese-pasta" />
          <div class="card__rating">${renderRating(item.ratings)}</div>
          <p class="card__name delicious__name-food">${item.name}</p>
        </article>
      </li>
    </a>
    `;}).join(""): "";
};

export {
  renderRecipeTableTemplate,
  renderRecipeDetails,
  renderListRecipesTemplate,
  renderRecipeDetailTemplate,
  renderListRecipesByCollectionTemplate,
  renderListRecipesBySweetTemplate,
};

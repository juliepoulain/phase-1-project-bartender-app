import { API_KEY } from "/api-key/config.js";
console.log(API_KEY);

const url = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/`;

//JP: fetches ingredients and populates select list with ingredient options
const populateIngredients = (ingredient) => {};

//JP: create submit event listener
const createSubmitListener = () => {};

//BD: fetches drinks and populates list with all for initial load
const populateDrinksInitial = () => {
  fetch(`${url}filter.php?c=Cocktail`)
    .then((r) => r.json())
    .then((cocktails) => {
      console.log(cocktails);
    });
};

//PA: handle submit to refetch and repopulate drink list with filtered data based on selected ingredients
const handleSubmit = () => {};

document.addEventListener("DOMContentLoaded", () => {
  //full execution
  main();
});

const main = () => {};

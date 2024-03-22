import { API_KEY } from "/api-key/config.js";
console.log(API_KEY);

const url = "www.thecocktaildb.com/api/json/v1/1/search.php?";

//JP: fetches ingredients and populates select list with ingredient options
const populateIngredients = (ingredient) => {};

//JP: create submit event listener
const createSubmitListener = () => {};

//BD: fetches drinks and populates list with all for initial load
const populateDrinksInitial = (drink) => {};

//PA: handle submit to refetch and repopulate drink list with filtered data based on selected ingredients
const handleSubmit = () => {};

document.addEventListener("DOMContentLoaded", () => {
  //full execution
  main();
});

const main = () => {};

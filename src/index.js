import { API_KEY } from "/api-key/config.js";
console.log(API_KEY);

const url = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/`;

//JP: fetches ingredients and populates select list with ingredient options
const ingredientSelect1 = document.querySelector("#select-ingredient1");
const ingredientSelect2 = document.querySelector("#select-ingredient2");
const ingredientSelect3 = document.querySelector("#select-ingredient3");
const populateIngredients = () => {
  fetch(`${url}i=list`)
    .then((r) => r.json())
    .then((ingredients) => {
      console.log(ingredients);
      for (const ingredient of ingredients) {
          const selectOption = document.createElement("option");
          selectOption.textContent = ingredient;
          ingredientSelect1.append(selectOption);
          ingredientSelect2.append(selectOption);
          ingredientSelect3.append(selectOption);
      };
    });
};

//JP: create submit event listener
const createSubmitListener = () => {
  const form = document.querySelector("#form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    const formSelections = {
        Ing1: e.target["select-ingredient1"].value,
        Ing2: e.target["select-ingredient2"].value,
        Ing3: e.target["select-ingredient3"].value,
      };
    console.log(formSelections)
    handleSubmit(formSelections);
  });
};

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

const main = () => {
  populateIngredients();
  createSubmitListener();
};

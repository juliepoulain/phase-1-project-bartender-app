import { API_KEY } from "/api-key/config.js";
console.log(API_KEY);

const url = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/`;

//JP: fetches ingredients and populates select list with ingredient options
const ingredientSelect1 = document.querySelector("#ingredient-select1");
const ingredientSelect2 = document.querySelector("#ingredient-select2");
const ingredientSelect3 = document.querySelector("#ingredient-select3");
const populateIngredients = () => {
  fetch(`${url}list.php?i=list`)
    .then((r) => r.json())
    .then((data) => {
      for (const ingredient of data.drinks) {
        const selectOption = document.createElement("option");
        selectOption.value = ingredient.strIngredient1;
        selectOption.textContent = ingredient.strIngredient1;
        const selectOption2 = selectOption.cloneNode("true");
        const selectOption3 = selectOption.cloneNode("true");
        ingredientSelect1.appendChild(selectOption);
        ingredientSelect2.appendChild(selectOption2);
        ingredientSelect3.appendChild(selectOption3);
      }
    });
};

//JP: create submit event listener
const createSubmitListener = () => {
  const handleSubmit = (Ing1, Ing2, Ing3) => {
    console.log("Form Selections:",Ing1,", ",Ing2, ", ",Ing3);
  };

  const form = document.querySelector("#form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    const Ing1 = e.target["select-ingredient1"].value;
    const Ing2 = e.target["select-ingredient2"].value;
    const Ing3 = e.target["select-ingredient3"].value;
    handleSubmit(Ing1, Ing2, Ing3);
  });
};

//BD: fetches drinks and populates list with all for initial load
const populateDrinksInitial = () => {
  fetch(`${url}filter.php?c=Cocktail`)
    .then((r) => r.json())
    .then((cocktails) => {});
};

//PA: handle submit to refetch and repopulate drink list with filtered data based on selected ingredients
const handleSubmit = (Ing1, Ing2, Ing3) => {
  fetch(`${url}filter.php?i=${Ing1}`)
    .then((r) => r.json())
    .then((data) => {});
};

document.addEventListener("DOMContentLoaded", () => {
  //full execution
  main();
});

const main = () => {
  populateIngredients();
  createSubmitListener();
};

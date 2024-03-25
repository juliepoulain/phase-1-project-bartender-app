import { API_KEY } from "/api-key/config.js";
console.log(API_KEY);

const url = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/`;

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

const createSubmitListener = () => {
  const logSubmit = (Ing1, Ing2, Ing3) => {
    console.log("Form Selections:", Ing1, ", ", Ing2, ", ", Ing3);
  };
  const form = document.querySelector("#form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    const Ing1 = e.target["select-ingredient1"].value;
    const Ing2 = e.target["select-ingredient2"].value;
    const Ing3 = e.target["select-ingredient3"].value;
    logSubmit(Ing1, Ing2, Ing3);
    handleSubmit(Ing1, Ing2, Ing3);
  });
};

const populateDrinksInitial = () => {
  fetch(`${url}filter.php?c=Cocktail`)
    .then((r) => r.json())
    .then((cocktails) => {});
};

const availableDrinkList = document.querySelector("#availableDrinks");
const handleSubmit = (Ing1, Ing2, Ing3) => {
  availableDrinkList.innerHTML = "";
  fetch(`${url}filter.php?i=${Ing1}`)
    .then((r) => r.json())
    .then((data) => {
      for (const drink of data.drinks) {
        const ing1Ol = document.createElement("ol");
        ing1Ol.textContent = drink.strDrink;
        ing1Ol.id = drink.idDrink;
        availableDrinkList.append(ing1Ol);
      }
    });
  fetch(`${url}filter.php?i=${Ing2}`)
    .then((r) => r.json())
    .then((data) => {
      for (const drink of data.drinks) {
        const ing2Ol = document.createElement("ol");
        ing2Ol.textContent = drink.strDrink;
        ing2Ol.id = drink.idDrink;
        availableDrinkList.append(ing2Ol);
      }
    });
  fetch(`${url}filter.php?i=${Ing3}`)
    .then((r) => r.json())
    .then((data) => {
      for (const drink of data.drinks) {
        const ing3Ol = document.createElement("ol");
        ing3Ol.textContent = drink.strDrink;
        ing3Ol.id = drink.idDrink;
        availableDrinkList.append(ing3Ol);
      }
    });
};

const availableDrinksClickEvent = () => {
  availableDrinkList.addEventListener("click", function (event) {
    const clickedElement = event.target;
    if (clickedElement.tagName === "OL") {
      const drinkId = clickedElement.id;
      const drinkName = clickedElement.textContent;
      const cocktailElement = document.querySelector(".cocktail-name");
      cocktailElement.textContent = drinkName;
      addSaveFavoriteClickEvent(drinkId);
      fetch(`${url}lookup.php?i=${drinkId}`)
        .then((r) => r.json())
        .then((data) => {
          const displayImageDiv = document.querySelector("#cocktail-image");
          const drinkImg = data.drinks[0].strDrinkThumb;
          displayImageDiv.src = drinkImg;
          displayImageDiv.alt = drinkName;
        });
    }
  });
};

const addSaveFavoriteClickEvent = (drinkId) => {
  console.log(drinkId);
  const saveFavoriteButtons = document.querySelectorAll("#favorites");
  saveFavoriteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedDrink =
        document.querySelector(".cocktail-name").textContent;
      console.log(selectedDrink);
      handleFavorite(selectedDrink, drinkId);
    });
  });
};

const handleFavorite = (selectedDrink, drinkId) => {
  const favoritesList = document.querySelector("#favoritesList");
  const ol = document.createElement("ol");
  ol.textContent = selectedDrink;
  ol.className = "favoriteItem";
  ol.id = drinkId;
  favoritesList.append(ol);
  console.log(ol);
  console.log(drinkId);
  createFavoriteListClickEvent(drinkId);
};

document.addEventListener("DOMContentLoaded", () => {
  //full execution
  main();
});

const main = () => {
  populateIngredients();
  createSubmitListener();
  availableDrinksClickEvent();
};

//TO DO:
//PA: addClickEvent function from each populated drink in drinks.
//Data will be called "drinkDataFull"
//PA: handleClick function to populate cocktail name, picture, ingredients, recipe (pass things like drinkDataFull.)

//BD: addSaveFavoriteClickEvent to create click event function for favorite button
//BD: handleFavorite function to populate favorites list with drink name

//JP: addClickEventFavorite function to add click events to favorites list items
//JP: handleFavoritesClickEvent to repopulate cocktail name, picture, ing, recipe

//addHoverEvent to picture
//handleHoverEvent to display drink name on picture

//POLISH:
//css/layout to be prettier
//drinks list to have scroller
//populate drink list with drinks with ALL ingredients, etc.

const createFavoriteListClickEvent = (drinkId) => {
  const favoriteItem = document.querySelector(".favoriteItem");
  favoriteItem.addEventListener("click", (e) => {
    console.log(`${drinkId} clicked`);
    handleClick(drinkId);
  });
};

const ingredientsList = document.getElementById("Ingredients-ul");
const recipeElement = document.querySelector("#Recipe-ul");
const handleClick = (drinkId) => {
  fetch(`${url}lookup.php?i=${drinkId}`)
    .then((r) => r.json())
    .then((data) => {
      ingredientsList.innerHTML = "";
      recipeElement.innerHTML = "";
      const nameElement = document.querySelector(".cocktail-name");
      nameElement.textContent = data.drinks[0].strDrink;
      const imgElement = document.querySelector("#cocktail-image");
      imgElement.src = data.drinks[0].strDrinkThumb;
      imgElement.alt = data.drinks[0].strDrink;
      const newRecipe = document.createElement("ol");
      newRecipe.textContent = data.drinks[0].strInstructions;
      recipeElement.append(newRecipe);
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredientName = data.drinks[0][`strIngredient${i}`];
        const measure = data.drinks[0][`strMeasure${i}`];
        if (ingredientName && ingredientName.trim() !== "") {
          ingredients.push(`${measure} ${ingredientName}`);
        }
      }
      ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      });
    });
};

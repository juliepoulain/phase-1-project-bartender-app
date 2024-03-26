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

let selectedDrink;

const availableDrinkList = document.querySelector("#availableDrinks");
const handleSubmit = (Ing1, Ing2, Ing3) => {
  availableDrinkList.innerHTML = "";
  fetch(`${url}filter.php?i=${Ing1}`)
    .then((r) => r.json())
    .then((data) => {
      for (const drink of data.drinks) {
        const ing1Li = document.createElement("li");
        ing1Li.addEventListener("click", (e) => {
          const clickedElement = e.target;
          const drinkId = clickedElement.id;
          const drinkName = clickedElement.textContent;
          const cocktailElement = document.querySelector(".cocktail-name");
          cocktailElement.textContent = drinkName;
          selectedDrink = drink;
          fetch(`${url}lookup.php?i=${drinkId}`)
            .then((r) => r.json())
            .then((data) => {
              const displayImageDiv = document.querySelector("#cocktail-image");
              const drinkImg = data.drinks[0].strDrinkThumb;
              displayImageDiv.src = drinkImg;
              displayImageDiv.alt = drinkName;
            });
        });
        ing1Li.textContent = drink.strDrink;
        ing1Li.id = drink.idDrink;
        availableDrinkList.append(ing1Li);
      }
    });
  fetch(`${url}filter.php?i=${Ing2}`)
    .then((r) => r.json())
    .then((data) => {
      for (const drink of data.drinks) {
        const ing2Li = document.createElement("li");
        ing2Li.addEventListener("click", (e) => {
          const clickedElement = e.target;
          const drinkId = clickedElement.id;
          const drinkName = clickedElement.textContent;
          const cocktailElement = document.querySelector(".cocktail-name");
          cocktailElement.textContent = drinkName;
          selectedDrink = drink;
          fetch(`${url}lookup.php?i=${drinkId}`)
            .then((r) => r.json())
            .then((data) => {
              const displayImageDiv = document.querySelector("#cocktail-image");
              const drinkImg = data.drinks[0].strDrinkThumb;
              displayImageDiv.src = drinkImg;
              displayImageDiv.alt = drinkName;
            });
        });
        ing2Li.textContent = drink.strDrink;
        ing2Li.id = drink.idDrink;
        availableDrinkList.append(ing2Li);
      }
    });
  fetch(`${url}filter.php?i=${Ing3}`)
    .then((r) => r.json())
    .then((data) => {
      for (const drink of data.drinks) {
        const ing3Li = document.createElement("li");
        ing3Li.addEventListener("click", (e) => {
          const clickedElement = e.target;
          const drinkId = clickedElement.id;
          const drinkName = clickedElement.textContent;
          const cocktailElement = document.querySelector(".cocktail-name");
          cocktailElement.textContent = drinkName;
          selectedDrink = drink;
          fetch(`${url}lookup.php?i=${drinkId}`)
            .then((r) => r.json())
            .then((data) => {
              const displayImageDiv = document.querySelector("#cocktail-image");
              const drinkImg = data.drinks[0].strDrinkThumb;
              displayImageDiv.src = drinkImg;
              displayImageDiv.alt = drinkName;
            });
        });
        ing3Li.textContent = drink.strDrink;
        ing3Li.id = drink.idDrink;
        availableDrinkList.append(ing3Li);
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
          console.log(drinkImg);

          //ingredient
          const ingredientsList = document.getElementById("Ingredients-ul");
          ingredientsList.innerHTML = "";

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

         //recipe
          const recipeList = document.getElementById("Recipe-ul");
          recipeList.innerHTML = ""; 

          const instructions = data.drinks[0].strInstructions.split('\n');
          instructions.forEach(instruction => {
            if (instruction.trim() !== "") {
              const li = document.createElement("li");
              li.textContent = instruction.trim();
              recipeList.appendChild(li);
            }
          });
        })
        .catch((error) => {
        });
    }
  });
};


const addSaveFavoriteClickEvent = (drinkId) => {
  const saveFavoriteButtons = document.querySelector("#favorites");
  saveFavoriteButtons.addEventListener("click", (e) => {
    handleFavorite();
  });
};

const handleFavorite = () => {
  const favoritesList = document.querySelector("#favoritesList");
  const li = document.createElement("li");
  li.textContent = selectedDrink.strDrink;
  li.className = "favoriteItem";
  li.id = selectedDrink.idDrink;
  favoritesList.append(li);
  console.log(li);
  console.log(selectedDrink.idDrink);
  createFavoriteListClickEvent(selectedDrink.idDrink);
};

document.addEventListener("DOMContentLoaded", () => {
  //full execution
  main();
});

const main = () => {
  populateIngredients();
  createSubmitListener();
  addSaveFavoriteClickEvent();
};

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
      const newRecipe = document.createElement("li");
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

//POLISH:
//css/layout to be prettier
//consider populate all drinks on intiial refresh
//drinks list to have scroller
//populate drink list with drinks with ALL ingredients, etc.
//fix weird click with favorite
//add favorites to db.json to retain data
//consider creating cocktail name, image, ing, recipe only when necessary (no templates at start)

import { API_KEY } from "/api-key/config.js";

const url = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/`;

const ingredientSelect1 = document.querySelector("#ingredient-select1");
const ingredientSelect2 = document.querySelector("#ingredient-select2");
const ingredientSelect3 = document.querySelector("#ingredient-select3");

//adds available drink ingredients from API to 3 dropdown menus
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

//adds submit listener to see cocktail ingredients form and creates variables for ing1, ing2, and ing3. Invokes handleSubmit
const createSubmitListener = () => {
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

let selectedDrink;
const availableDrinkList = document.querySelector("#availableDrinks");

//when invoked from submit form event:
//step 1: refresh available drink list
//step 2: fetch drinks from API based on FIRST ingredient selection query.
//step 3: Populates available drink list with all avaialble drinks based on query inside new LIs
//step 4: adds event listener to new LIs
//step 5: event listener, when triggered, fetches drink information by Id
//step 6: event listener, when triggered, adds applicable elements to DOM from API
//step 7: repeat steps 2-6 for ing2, and ing3 selections

const handleSubmit = (Ing1, Ing2, Ing3) => {
  availableDrinkList.innerHTML = "";
  fetch(`${url}filter.php?i=${Ing1}`)
    .then((r) => r.json())
    .then((data) => {
      //loops through object items for data and adds event listener for new element
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
              //image
              const displayImageDiv = document.querySelector("#cocktail-image");
              const drinkImg = data.drinks[0].strDrinkThumb;
              displayImageDiv.src = drinkImg;
              displayImageDiv.alt = drinkName;
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
              const instructions = data.drinks[0].strInstructions.split("\n");
              instructions.forEach((instruction) => {
                if (instruction.trim() !== "") {
                  const li = document.createElement("li");
                  li.textContent = instruction.trim();
                  recipeList.appendChild(li);
                }
              });
              //create button in DOM if button is not already there
              const buttonDiv = document.querySelector("#buttonDiv");
              if (buttonDiv.innerHTML === "") {
                console.log("true");
                const button = document.createElement("button");
                button.id = "favorites";
                button.textContent = "SAVE TO FAVORITES";
                buttonDiv.append(button);
                button.addEventListener("click", (e) => {
                  handleFavorite(drinkId);
                  buttonDiv.innerHTML = "";
                });
              }
            });
        });
        //append Li element to dom
        ing1Li.textContent = drink.strDrink;
        ing1Li.id = drink.idDrink;
        availableDrinkList.append(ing1Li);
      }
    });
  fetch(`${url}filter.php?i=${Ing2}`)
    .then((r) => r.json())
    .then((data) => {
      //loops through object items for data and adds event listener for new element
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
              //image
              const displayImageDiv = document.querySelector("#cocktail-image");
              const drinkImg = data.drinks[0].strDrinkThumb;
              displayImageDiv.src = drinkImg;
              displayImageDiv.alt = drinkName;
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
              const instructions = data.drinks[0].strInstructions.split("\n");
              instructions.forEach((instruction) => {
                if (instruction.trim() !== "") {
                  const li = document.createElement("li");
                  li.textContent = instruction.trim();
                  recipeList.appendChild(li);
                }
              });
              //create button in DOM if button is not already there
              const buttonDiv = document.querySelector("#buttonDiv");
              if (buttonDiv.innerHTML === "") {
                console.log("true");
                const button = document.createElement("button");
                button.id = "favorites";
                button.textContent = "SAVE TO FAVORITES";
                buttonDiv.append(button);
                button.addEventListener("click", (e) => {
                  handleFavorite(drinkId);
                  buttonDiv.innerHTML = "";
                });
              }
            });
        });
        //append new li element to dom availableDrinkList
        ing2Li.textContent = drink.strDrink;
        ing2Li.id = drink.idDrink;
        availableDrinkList.append(ing2Li);
      }
    });
  fetch(`${url}filter.php?i=${Ing3}`)
    .then((r) => r.json())
    .then((data) => {
      //loops through object items for data and adds event listener for new element
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
              //image
              const displayImageDiv = document.querySelector("#cocktail-image");
              const drinkImg = data.drinks[0].strDrinkThumb;
              displayImageDiv.src = drinkImg;
              displayImageDiv.alt = drinkName;
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
              const instructions = data.drinks[0].strInstructions.split("\n");
              instructions.forEach((instruction) => {
                if (instruction.trim() !== "") {
                  const li = document.createElement("li");
                  li.textContent = instruction.trim();
                  recipeList.appendChild(li);
                }
              });
              //create button in DOM if button is not already there
              const buttonDiv = document.querySelector("#buttonDiv");
              if (buttonDiv.innerHTML === "") {
                console.log("true");
                const button = document.createElement("button");
                button.id = "favorites";
                button.textContent = "SAVE TO FAVORITES";
                buttonDiv.append(button);
                button.addEventListener("click", (e) => {
                  handleFavorite(drinkId);
                  buttonDiv.innerHTML = "";
                });
              }
            });
        });
        ing3Li.textContent = drink.strDrink;
        ing3Li.id = drink.idDrink;
        availableDrinkList.append(ing3Li);
      }
    });
};

//when invoked, creates li element inside favorites list for drink that was displayed, saves id
const handleFavorite = (drinkId) => {
  const favoritesList = document.querySelector("#favoritesList");
  const li = document.createElement("li");
  li.addEventListener("click", (e) => {
    console.log(`${drinkId} clicked`);
    handleClick(drinkId);
  });
  li.textContent = selectedDrink.strDrink;
  li.className = "favoriteItem";
  li.id = selectedDrink.idDrink;
  favoritesList.append(li);
  handleClick(selectedDrink.idDrink);
};

//waits for dom to load, then invokes main
document.addEventListener("DOMContentLoaded", () => {
  main();
});

//invokes initial form population event and event listener functions
const main = () => {
  populateIngredients();
  createSubmitListener();
};

const ingredientsList = document.getElementById("Ingredients-ul");
const recipeElement = document.querySelector("#Recipe-ul");

//refreshes ingredients and recipes lists
//repopulates DOM with clicked favorite Li data based on fetch with Id
const handleClick = (drinkId) => {
  fetch(`${url}lookup.php?i=${drinkId}`)
    .then((r) => r.json())
    .then((data) => {
      //name
      const cocktailName = document.querySelector(".cocktail-name");
      cocktailName.textContent = data.drinks[0].strDrink;
      //image
      const displayImageDiv = document.querySelector("#cocktail-image");
      displayImageDiv.src = data.drinks[0].strDrinkThumb;
      displayImageDiv.alt = data.drinks[0].strDrink;
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
      const instructions = data.drinks[0].strInstructions.split("\n");
      instructions.forEach((instruction) => {
        if (instruction.trim() !== "") {
          const li = document.createElement("li");
          li.textContent = instruction.trim();
          recipeList.appendChild(li);
        }
      });
    });
};

//POLISH:
//css/layout to be prettier
//add favorites to db.json to retain data
//consider creating cocktail name, image, ing, recipe only when necessary (no templates at start)
//consider removing second and third select fields to fix nesting

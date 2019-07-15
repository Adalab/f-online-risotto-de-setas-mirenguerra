"use strict";

const recipeURL =
  "https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json";

const recipeTitle = document.querySelector(".header__title");
const articlesList = document.querySelector(".articles__list");
const totalItemsEl = document.querySelector(".buy__items-quantity");
const subtotalEl = document.querySelector(".buy__subtotal-quantity");
const shippingPriceEl = document.querySelector(".buy__shipping-quantity");
const totalEl = document.querySelector(".buy__total-quantity");
const btnAllSelected = document.querySelector(".select");
const btnAllUnselected = document.querySelector(".unselect");
const btnTotal = document.querySelector(".buy-btn");

let ingredients = [];
let shippingCost = null;
let subtotal = 0;
let total = 0;
let selectedItems = [];
let checkboxList = 0;
let itemsList = [];
let itemsPriceList = [];

function getRecipe() {
  fetch(recipeURL)
    .then(res => res.json())
    .then(data => {
      const recipe = data.recipe;
      ingredients = data.recipe.ingredients;

      ingredients.forEach(ingredient => {
        ingredient.checked = false;
      });

      printRecipe(recipe);
      getShippingPrice(recipe);
    });
}
getRecipe();

function getShippingPrice(recipe) {
  shippingCost = recipe["shipping-cost"];
  shippingPriceEl.innerHTML = shippingCost + " €";
}

function handleInputCheckbox(event) {
  const checked = event.target.checked;
  const id = event.target.id;

  ingredients[id].checked = checked;
  if (checked) {
    ingredients[id].items = 1;
    itemsList[id].value = ingredients[id].items;
  } else {
    ingredients[id].items = 0;
    itemsList[id].value = ingredients[id].items;
  }

  calculateValue();
}

function handleInputItems(event) {
  const value = event.target.value;
  const id = event.target.id;
  if (value === "") {
    ingredients[id].items = 0;
  } else {
    ingredients[id].items = value;
  }
  calculateValue();
}

function calculateValue() {
  selectedItems = 0;
  subtotal = 0;
  total = 0;
  for (let i = 0; i < ingredients.length; i++) {
    const actualIngredient = ingredients[i];
    const totalItems = actualIngredient.checked ? parseInt(actualIngredient.items) : 0;
    selectedItems += totalItems;
    const itemPrice = actualIngredient.checked ? actualIngredient.price * totalItems : 0;
    itemsPriceList[i].innerHTML = Math.round(itemPrice * 100) / 100 + " €";
    subtotal += itemPrice;
  }
  if (selectedItems === 0) {
    shippingCost = 0;
  } else {
    shippingCost = shippingCost;
  }
  total = subtotal + shippingCost;
  totalItemsEl.innerHTML = selectedItems;
  subtotalEl.innerHTML = Math.round(subtotal * 100) / 100 + " €";
  shippingPriceEl.innerHTML = shippingCost + " €";
  totalEl.innerHTML = Math.round(total * 100) / 100 + " €";
  btnTotal.innerHTML = 'El precio total de tu compre es: ' + Math.round(total * 100) / 100 + " €";
}

function printRecipe(recipe) {
  recipeTitle.innerHTML = recipe.name;

  ingredients.map((ingredient, index) => {
    const newItemEl = document.createElement("li");
    newItemEl.id = index;
    newItemEl.classList.add(
      "articles__item",
      "listItem",
      "list-group-item",
      "d-flex",
      "align-items-center",
      "row",
      "p-1"
    );

    const newInputEl = document.createElement("input");
    newInputEl.type = "checkbox";
    newInputEl.name = "ingredients";
    newInputEl.value = ingredient.price;
    newInputEl.id = index;
    newInputEl.classList.add(
      "articles__item-checkbox",
      "col-1",
      "d-flex",
      "justify-content-center"
    );
    newInputEl.addEventListener("change", handleInputCheckbox);

    const newItemQuantityEl = document.createElement("input");
    newItemQuantityEl.type = "number";
    newItemQuantityEl.name = "itemsQuantity";
    newItemQuantityEl.value = 0;
    newItemQuantityEl.min = 0;
    newItemQuantityEl.id = index;
    newItemQuantityEl.classList.add(
      "articles__item-number",
      "d-flex",
      "text-center",
      "col-1",
      "border",
      "p-0"
    );
    newItemQuantityEl.addEventListener("keyup", handleInputItems);
    newItemQuantityEl.addEventListener("change", handleInputItems);

    const ingredientDataContainer = document.createElement("div");
    ingredientDataContainer.classList.add("ingredient-data-container");
    ingredientDataContainer.classList.add("col-8");

    const newProductEl = document.createElement("h1");
    const newProduct = document.createTextNode(ingredient.product);
    newProductEl.classList.add("m-0", "font-weight-bold");
    newProductEl.appendChild(newProduct);

    const newBrandEl = document.createElement("h2");
    const newBrand = document.createTextNode(ingredient.brand);
    newBrandEl.classList.add("m-0", "text-secondary", "small");
    newBrandEl.appendChild(newBrand);

    const newQuantityEl = document.createElement("h2");
    const newQuantity = document.createTextNode(ingredient.quantity);
    newQuantityEl.classList.add("m-0", "small");
    newQuantityEl.appendChild(newQuantity);

    const newPriceEl = document.createElement("p");
    const newPrice = document.createTextNode(ingredient.price + " €");
    newPriceEl.classList.add(
      "articles__item-price",
      "text-success",
      "font-weight-bold"
    );
    newPriceEl.appendChild(newPrice);

    ingredientDataContainer.appendChild(newProductEl);
    if (ingredient.brand !== undefined) {
      ingredientDataContainer.appendChild(newBrandEl);
    }
    ingredientDataContainer.appendChild(newQuantityEl);

    newItemEl.appendChild(newInputEl);
    newItemEl.appendChild(newItemQuantityEl);
    newItemEl.appendChild(ingredientDataContainer);
    newItemEl.appendChild(newPriceEl);

    articlesList.appendChild(newItemEl);

    checkboxList = document.querySelectorAll(".articles__item-checkbox");
    itemsList = document.querySelectorAll(".articles__item-number");
    itemsPriceList = document.querySelectorAll(".articles__item-price");
  });
}

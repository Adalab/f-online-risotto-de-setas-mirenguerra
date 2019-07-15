"use strict";

const recipeURL =
  "https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json";

const recipeTitle = document.querySelector(".header__title");
const articlesList = document.querySelector(".articles__list");
const totalItemsEl = document.querySelector(".buy__items-quantity");
const subtotal = document.querySelector(".buy__subtotal-quantity");
const shippingPriceEl = document.querySelector(".buy__shipping-quantity");
const total = document.querySelector(".buy__total-quantity");
const btnAllSelected = document.querySelector(".select");
const btnAllUnselected = document.querySelector(".unselect");
const btnTotal = document.querySelector(".buy-btn");

let ingredients;
let totalItems;
let shippingCost;
let subtotalPrice;
let totalPrice;
let arrCheckbox = [];

function getRecipe() {
  fetch(recipeURL)
    .then(res => res.json())
    .then(data => {
      const recipe = data.recipe;
      ingredients = data.recipe.ingredients;

      printRecipe(recipe);
      getShippingPrice(recipe);
    });
}
getRecipe();

function getShippingPrice(recipe) {
  shippingCost = recipe["shipping-cost"];
  shippingPriceEl.innerHTML = shippingCost + " €";
}

function calculateValues() {
  totalItemsEl.innerHTML = totalItems;
  subtotal.innerHTML = `${totalPrice.toFixed(2)} €`;
  total.innerHTML =
    totalItems !== 0
      ? `${(totalPrice + shippingCost).toFixed(2)} €`
      : `${totalPrice.toFixed(2)} €`;
  btnTotal.innerHTML = total.innerHTML;
}

function handleInputCheckbox(event) {
  const selectedCheckbox = event.target.checked;
  const id = event.target.id;
  if (selectedCheckbox) {
    ingredients[id].items = 1;
    totalItems[id].value = ingredients[id].items;
  } else {
    ingredients[id].items = 0;
    totalItems[id].value = ingredients[id].items;
  }

  calculateValues();
}

function handleInputQuantity(event) {
  const value = event.target.value;
  const id = event.target.id;
  if (value === "") {
    ingredients[id].items = 0;
    arrCheckbox[id].checked = false;
  } else {
    ingredients[id].items = value;
    arrCheckbox[id].checked = true;
  }
  calculateValues();
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
    arrCheckbox = document.querySelectorAll("articles__item-checkbox");
    newInputEl.addEventListener("click", handleInputCheckbox);

    const newItemQuantityEl = document.createElement("input");
    newItemQuantityEl.type = "number";
    newItemQuantityEl.name = "itemsQuantity";
    newItemQuantityEl.value = ingredient.items;
    newItemQuantityEl.min = 0;
    newItemQuantityEl.id = index;
    newItemQuantityEl.addEventListener("change", handleInputQuantity);
    newItemQuantityEl.classList.add(
      "counter-data",
      "d-flex",
      "text-center",
      "col-1",
      "border",
      "p-0"
    );
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
    newPriceEl.classList.add("price-item", "text-success", "font-weight-bold");
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
  });
}

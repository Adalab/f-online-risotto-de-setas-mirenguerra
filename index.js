"use strict";

const recipeURL =
  "https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json";

const recipeTitle = document.querySelector(".header__title");
const articlesList = document.querySelector(".articles__list");
const subtotal = document.querySelector(".buy__subtotal-quantity");
const shippingPrice = document.querySelector(".buy__shipping-quantity");
const total = document.querySelector(".buy__total-quantity");
const btnAllSelected = document.querySelector(".select");
const btnAllUnselected = document.querySelector(".unselect");
const btnTotal = document.querySelector(".buy-btn");

let items;
let subtotalPrice = 0;
let totalPrice = 0;

function getRecipe() {
  fetch(recipeURL)
    .then(res => res.json())
    .then(data => {
      const recipe = data.recipe;
      console.log(recipe);
      printRecipe(recipe);
    });
}
getRecipe();

function printRecipe(recipe) {
  recipeTitle.innerHTML = recipe.name;
  shippingPrice.innerHTML = recipe["shipping-cost"];

  recipe.ingredients.map(ingredient => {
    const newItemEl = document.createElement("div");

    const newInputEl = document.createElement("input");
    newInputEl.type = "checkbox";
    newInputEl.name = "ingredients";
    newInputEl.value = ingredient.price;
    newInputEl.classList.add("articles__item-checkbox");

    const newItemQuantityEl = document.createElement("input");
    newItemQuantityEl.type = "number";
    newItemQuantityEl.name = "itemsQuantity";
    newItemQuantityEl.value = 1;

    const newProductEl = document.createElement("h1");
    const newProduct = document.createTextNode(ingredient.product);
    newProductEl.appendChild(newProduct);

    const newBrandEl = document.createElement("h2");
    const newBrand = document.createTextNode(ingredient.brand);
    newBrandEl.appendChild(newBrand);

    const newQuantityEl = document.createElement("p");
    const newQuantity = document.createTextNode(ingredient.price + " €");
    newQuantityEl.appendChild(newQuantity);

    newItemEl.appendChild(newInputEl);
    newItemEl.appendChild(newItemQuantityEl);
    newItemEl.appendChild(newProductEl);
    if (ingredient.brand !== undefined) {
      newItemEl.appendChild(newBrandEl);
    }
    newItemEl.appendChild(newQuantityEl);

    articlesList.appendChild(newItemEl);
  });
}

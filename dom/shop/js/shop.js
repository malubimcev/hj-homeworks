'use strict';

const buttons = document.querySelectorAll('.add');
const cartCount = document.querySelector('#cart-count');
const cartTotalPrice = document.querySelector('#cart-total-price');
let amount = 0, totalPrice = 0;

function setEvents() {
  for (const btn of buttons) {
    btn.addEventListener('click', addProduct);
  }
}

function addProduct() {
  totalPrice += +this.dataset.price;
  amount++;
  cartCount.innerHTML = amount;
  cartTotalPrice.innerHTML = getPriceFormatted(totalPrice);
}

setEvents();
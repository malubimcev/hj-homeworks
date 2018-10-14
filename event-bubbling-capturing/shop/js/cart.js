'use strict';

const productList = document.querySelector('.items-list');
productList.addEventListener('click', onProductListClick, true);

function onProductListClick(event) {
  const addButtons = Array.from(productList.querySelectorAll('.add-to-cart'));
  addButtons.forEach(btn => btn.addEventListener('click', onAddButtonClick));
}

function onAddButtonClick(event) {
  const btn = event.target;
  addToCart({title: btn.dataset.title, price: btn.dataset.price});
  event.stopPropagation();
}
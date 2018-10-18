'use strict';

const productList = document.querySelector('.items-list');
productList.addEventListener('click', onButtonClick, true);

function onButtonClick(event) {
  const btn = event.target;
  if (btn.className === 'add-to-cart') {
    addToCart({title: btn.dataset.title, price: btn.dataset.price});
    event.stopPropagation();
  }
}
'use strict';

const form = document.querySelector('#AddToCartForm');
const colorSwatch = form.querySelector('#colorSwatch');
const sizeSwatch = form.querySelector('#sizeSwatch');
const cart = document.querySelector('#quick-cart');
const addButton = form.querySelector('#AddToCart');

const urls = [
  'https://neto-api.herokuapp.com/cart/colors',
  'https://neto-api.herokuapp.com/cart/sizes',
  'https://neto-api.herokuapp.com/cart'
];

addButton.addEventListener('click', (event) => {
  event.preventDefault();
  sendForm(form);
});

function updateCart(data, url) {
  fetch(url, {
    body: data,
    method: 'POST'
  })
    .then(res => {
      if (200 <= res.status && res.status < 300) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(outputCart)
    .catch(err => console.log('Ошибка обновления корзины: ' + err.message));  
}

function sendForm(form) {
  const formData = new FormData(form);
  formData.append('productId', form.dataset.productId);
  updateCart(formData, urls[2]);
}

function removeProduct(id) {
  const data = new FormData();
  data.append('productId', id);
  updateCart(data, urls[2] + '/remove');
}

function loadData(url) {
  return fetch(url)
    .then(res => {
      if (200 <= res.status && res.status < 300) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
}

function colorSnippet(color) {
  return `<div data-value="${color.type}" class="swatch-element color ${color.type} ${color.isAvailable ? 'available' : 'soldout'}">
    <div class="tooltip">${color.title}</div>
    <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}">
    <label for="swatch-1-${color.type}" style="border-color: ${color.code};">
      <span style="background-color: ${color.type};"></span>
      <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
    </label>
  </div>`;
}

function sizeSnippet(size) {
  return `<div data-value="${size.type}" class="swatch-element plain ${size.type} ${size.isAvailable ? 'available' : 'soldout'}">
    <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${size.isAvailable ? '' : 'disabled'}>
    <label for="swatch-0-${size.type}">
      ${size.title}
      <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
    </label>
  </div>`;
}

function productSnippet(product) {
  return `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${product.id}" style="opacity: 1;">
    <div class="quick-cart-product-wrap">
      <img src="${product.pic}" title="${product.title}">
      <span class="s1" style="background-color: #000; opacity: .5">${product.price}</span>
      <span class="s2"></span>
    </div>
    <span class="count hide fadeUp" id="quick-cart-product-count-${product.id}">${product.quantity}</span>
    <span class="quick-cart-product-remove remove" data-id="${product.id}"></span>
  </div>`;
}

function cartSnippet(summ) {
  return `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${summ === 0 ? '' : 'open'}">
    <span>
      <strong class="quick-cart-text">Оформить заказ<br></strong>
      <span id="quick-cart-price">${summ}</span>
    </span>
  </a>`;
}

function saveColor(event) {
  if (event.target.checked) {
    localStorage.setItem('color', event.target.value);
  }
}

function saveSize(event) {
  if (event.target.checked) {
    localStorage.setItem('size', event.target.value);
  }
}

function outputColors(colors) {
  colorSwatch.innerHTML += colors.map(color => colorSnippet(color)).join('');
  const savedColor = localStorage.getItem('color');
  if (savedColor) {
    const colorElements = colorSwatch.querySelectorAll('input');
    for (const elem of colorElements) {
      elem.checked = elem.value === savedColor;
    };
  }
}

function outputSizes(sizes) {
  sizeSwatch.innerHTML += sizes.map(size => sizeSnippet(size)).join('');
  const savedSize = localStorage.getItem('size');
  if (savedSize) {
    const sizeElements = sizeSwatch.querySelectorAll('input');
    for (const elem of sizeElements) {
      elem.checked = elem.value === savedSize;
    };
  }
}

function outputCart(products) {
  let totalPrice = 0;
  if (!products || products.error || products.length === 0) {
    cart.innerHTML = '';
  } else {
    cart.innerHTML = productSnippet(products[0]);
    cart.querySelector('.count').textContent = products[0].quantity;
    totalPrice = products[0].price * products[0].quantity;
  }
  cart.innerHTML += cartSnippet(totalPrice);
  if (!products.error && products.length > 0) {  
    const removeButton = cart.querySelector('.remove');
    removeButton.addEventListener('click', (event) => {
      removeProduct(event.target.dataset.id);
    });
  }
}

Promise.all(urls.map(loadData))
  .then(([
    colors,
    sizes,
    products
  ]) => {
    outputColors(colors);
    const colorElements = colorSwatch.querySelectorAll('input');
    for (const color of colorElements) {
      color.addEventListener('change', saveColor);
    }
    outputSizes(sizes);
    const sizeElements = sizeSwatch.querySelectorAll('input');
    for (const size of sizeElements) {
      size.addEventListener('change', saveSize);
    }
    outputCart(products);
  })
  .catch(err => console.log('Ошибка загрузки данных: ' + err.message));

'use strict';

const form = document.querySelector('#AddToCartForm');
const colorSwatch = form.querySelector('#colorSwatch');
const sizeSwatch = form.querySelector('#sizeSwatch');
const cart = document.querySelector('#quick-cart');
const addButton = form.querySelector('#AddToCart');
const removeButton = form.querySelector('.remove');
let colors, sizes=[{'title':'S','type':'s','isAvailable':false},{'title':'M','type':'m','isAvailable':true},{'title':'L','type':'l','isAvailable':true},{'title':'XL','type':'xl','isAvailable':true},{'title':'XXL','type':'xxl','isAvailable':false}], products;

addButton.addEventListener('click', () => sendForm(form));

function sendForm(form) {
  const xhr = new XMLHttpRequest();
  const data = getJSON(form);
  xhr.addEventListener('load', () => onResponseLoad(xhr.response));
  xhr.addEventListener('error', () => console.log('xhr error: ' + xhr.error.message));
  xhr.open('POST', getURL(''), true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(data);
}

function getJSON(form) {
  const formData = new FormData(form);
  formData.append('productId', form.dataset.productId);
  const data = {};
  for (const [key, value] of formData) {
    data[key] = value;
  }
  return JSON.stringify(data);
}

function getURL(category) {
  const url = 'https://neto-api.herokuapp.com/';
  return url + category;
}

function parseJSON(json) {
  try {
    console.log(json);
    return JSON.parse(json);
  } catch (err) {
    console.log('JSON.parse error: ' + err.message);
    return null;
  }
}

function onResponseLoad(response) {
  const result = parseJSON(response);
  if (result) {
    updateCart(result);
  }
}

function loadColors() {
  loadData('cart/colors', colors, outputColors);
}

function loadSizes() {
  loadData('cart/sizes', sizes, outputSizes);
}

function loadProducts() {
  loadData('cart', products, updateCart);
}

function loadData(type, array, callback) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    array = parseJSON(xhr.response);
    callback();
  });
  xhr.addEventListener('error', () => console.log('xhr error: ' + xhr.error.message));
  xhr.open('GET', getURL(type), true);
  xhr.send();
  // fetch(getURL(type))
  //   .then((res) => {
  //     if (200 <= res.status && res.status < 300) {
  //       return res.json();
  //     }
  //     throw new Error(res.statusText);
  //     })
  //   .then((res) => {
  //     array = parseJSON(res);
  //     callback();
  //   })
  //   .catch(err => console.log('fetch error: ' + err.message));  
}

function colorSnippet(color) {
  return `<div data-value="${color.type}" class="swatch-element color ${color.type} ${color.isAvailable ? 'available' : 'soldout'}">
    <div class="tooltip">${color.title}</div>
    <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" checked>
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
  return `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
    <span>
      <strong class="quick-cart-text">Оформить заказ<br></strong>
      <span id="quick-cart-price">${summ}</span>
    </span>
  </a>`;
}

function outputColors() {
  console.log(colors.length);
  colorSwatch.innerHTML = colors.map(color => colorSnippet(color)).join('');
}

function outputSizes() {
  sizeSwatch.innerHTML = sizes.map(size => sizeSnippet(size)).join('');
}

function updateCart() {
  cart.innerHTML = products.map(product => productSnippet(product)).join('');
  cart.querySelector('.count').textContent = products.length;
  const summ = products.reduce((sum, elem) => {sum += elem.price}, 0);
  cart.appendChild(cartSnippet(summ));
}

loadColors();
loadSizes();
loadProducts();

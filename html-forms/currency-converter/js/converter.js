'use strict';

const xhr = new XMLHttpRequest();
const content = document.querySelector('#content');
const fromList = document.querySelector('#from');
const toList = document.querySelector('#to');
const source = document.querySelector('#source');
const result = document.querySelector('#result');
const loader = document.querySelector('#loader');
let data = [];

function getData() {
  xhr.open('GET', 'https://neto-api.herokuapp.com/currency', true);
  xhr.send();
}

function onDataLoad() {
  data = JSON.parse(xhr.responseText);
  for (const curr of data) {
    createOption(curr, fromList);
    createOption(curr, toList);
  }
  updateResult();
}

function createOption(data, elem) {
  const option = document.createElement('option');
  option.value = data.value;
  option.innerText = data.code;
  elem.appendChild(option);
}

function setEvents() {
  fromList.addEventListener('change', updateResult);
  toList.addEventListener('change', updateResult);
  source.addEventListener('input', updateResult);
  xhr.addEventListener('load', onDataLoad);
  xhr.addEventListener('loadstart', () => {
    loader.classList.remove('hidden');
    content.classList.add('hidden');    
  });
  xhr.addEventListener('loadend', () => {
    loader.classList.add('hidden');
    content.classList.remove('hidden');      
  });
}

function convertCurrency() {
  if (toList.value !== 0) {
    return Math.round((source.value * fromList.value / toList.value) * 100) / 100;
  }
  return 0;
}

function updateResult() {
  result.value = convertCurrency();
}

setEvents();
getData();
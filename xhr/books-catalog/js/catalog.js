'use strict';

const xhr = new XMLHttpRequest();
const content = document.querySelector('#content');

function getData() {
  xhr.addEventListener('load', onDataLoad);
  xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
  xhr.send();
}

function onDataLoad() {
  const data = JSON.parse(xhr.responseText);
  for (const book of data) {
    const listItem = document.createElement('li');
    setElemData(book, listItem);
    content.appendChild(listItem);
  }
}

function setElemData(book, elem) {
  const img = document.createElement('img');
  img.src = book.cover.small;
  elem.appendChild(img);
  elem.dataset.title = book.title;
  elem.dataset.author = book.author;
  elem.dataset.info = book.info;
  elem.dataset.price = book.price;
}

getData();
'use strict';

const img = document.getElementById('currentPhoto');
const nextButton = document.getElementById('nextPhoto');
const prevButton = document.getElementById('prevPhoto');
const images = [
  './i/breuer-building.jpg',
  './i/guggenheim-museum.jpg',
  './i/headquarters.jpg',
  './i/IAC.jpg',
  './i/new-museum.jpg',
 ];
let index = 0;

function incIndex() {
  index++;
  if (index > images.length - 1) {
    index = 0;
  }
}

function decIndex() {
  index--;
  if (index < 0) {
    index = images.length - 1;
  }
}

function showPhoto() {
  img.src = images[index];
}

function showNext() {
  incIndex();
  showPhoto();
}

function showPrev() {
  decIndex();
  showPhoto();
}

nextButton.onclick = showNext;
prevButton.onclick = showPrev;
'use strict';

const img = document.getElementById('slider');

const images = [
  './i/airmax.png',
  './i/airmax-jump.png',
  './i/airmax-on-foot.png',
  './i/airmax-playground.png',
  './i/airmax-top-view.png',
 ];
let index = 0;

function showPhoto() {
  index++;
  if (index > images.length - 1) {
    index = 0;
  }
  img.src = images[index];
}
showPhoto();
setInterval(showPhoto, 5000);
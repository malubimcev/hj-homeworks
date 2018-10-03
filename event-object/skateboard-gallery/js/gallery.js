'use strict';
const view = document.getElementsByClassName('gallery-view')[0];
const links = document.getElementsByTagName('a');

function setEvents() {
  for (const link of links) {
    link.addEventListener('click', showFullImage);
  }
}

function showFullImage(event) {
  event.preventDefault();
  for (const link of links) {
    link.classList.remove('gallery-current');
  }
  this.classList.toggle('gallery-current');
  view.src = this.href;
}

setEvents();
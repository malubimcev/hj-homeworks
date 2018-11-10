'use strict';

const trash = document.querySelector('#trash_bin');
let icon = null;

document.addEventListener('mousedown', event => {
  if (event.target.classList.contains('logo')) {
    icon = event.target;
  }
});

document.addEventListener('mousemove', event => {
  if (icon) {
    event.preventDefault();
    const x = event.pageX - icon.width / 2;
    const y = event.pageY - icon.height / 2;
    icon.style.left = `${x}px`;
    icon.style.top = `${y}px`;
    icon.classList.add('moving');
  }
});

document.addEventListener('mouseup', event => {
  if (icon) {
    icon.style.visibility = 'hidden';
    const place = document.elementFromPoint(event.clientX, event.clientY);
    icon.style.visibility = 'visible';
    if (place === trash) {
      place.appendChild(icon);
      icon.classList.remove('moving');
      icon.style.display = 'none';
    }
  }
});
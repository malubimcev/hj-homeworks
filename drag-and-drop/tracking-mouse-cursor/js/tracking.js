'use strict';

const cat = document.querySelector('.cat');
const leftEyeArea = cat.querySelector('.cat_position_for_left_eye');
const rightEyeArea = cat.querySelector('.cat_position_for_right_eye');

function setEye(area, point) {
  const eye = area.querySelector('.cat_eye');
  let x = point.x - area.offsetLeft - cat.offsetLeft;
  let y = point.y - area.offsetTop - cat.offsetTop;
  
  const maxX = area.offsetWidth - eye.offsetWidth;
  const maxY = area.offsetHeight - eye.offsetHeight;

  x = Math.min(x, maxX);
  y = Math.min(y, maxY);
  x = Math.max(x, 0);
  y = Math.max(y, 0);
  
  eye.style.left = `${x}px`;
  eye.style.top = `${y}px`;
}

const onMove = throttle(event => {
  event.preventDefault();
  const point = {
    x: event.pageX,
    y: event.pageY
  };
  setEye(leftEyeArea, point);
  setEye(rightEyeArea, point);
});

document.addEventListener('mousemove', onMove);

function throttle(callback) {
  let isWaiting = false;
  return function() {
    if (!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      requestAnimationFrame(() => {
        isWaiting = false;
      });
    }
  };
}
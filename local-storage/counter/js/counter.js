'use strict';

const counterInfo = document.querySelector('#counter');
const buttons = document.querySelectorAll('.wrap-btns button');
let counter = 0;

function getCounter(operand) {
  if (operand === 0) {
    counter = 0;
  } else {
    counter += operand;
  }
  if (counter < 0) {
    counter = 0;
  }
  return counter;
}

function handleClick(event) {
  switch(event.target.id) {
    case 'increment':
      getCounter(1);
      break;
    case 'decrement':
      getCounter(-1);
      break;
    case 'reset':
      getCounter(0);
      break;
  }
  localStorage.setItem('counter', counter);
  showCounter();
}

function showCounter() {
  counterInfo.textContent = counter;
}

function setEvents() {
  for (const btn of buttons) {
    btn.addEventListener('click', handleClick);
  }
  counter = parseInt(localStorage.getItem('counter')) || 0;
}

setEvents();
showCounter();
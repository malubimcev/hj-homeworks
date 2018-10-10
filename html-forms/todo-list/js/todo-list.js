'use strict';

const listBlock = document.querySelector('.list-block');
const list = listBlock.querySelector('ul');
const listItems = list.querySelectorAll('li');
const tasks = list.querySelectorAll('li input');
const output = listBlock.querySelector('h3 output');


document.addEventListener('DOMContentLoaded', onDocumentLoad);

function onDocumentLoad() {
 updateCounter();
 setEvents();
}

function setEvents() {
  for (const item of listItems) {
  	item.addEventListener('click', updateCounter);
  }
}

function updateCounter() {
  let counter = 0;
  const taskCount = tasks.length;

  for (const task of tasks) {
  	if (task.checked) {
  	  counter++;
  	  task.setAttribute('checked', true);
  	}
  }
  output.innerText = counter + ' из ' + taskCount;

  if (counter === taskCount) {
    listBlock.classList.add('complete');
  } else {
  	listBlock.classList.remove('complete');
  }
}

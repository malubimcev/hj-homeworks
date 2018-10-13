'use strict';

function TodoList(container) {
  const doneList = container.querySelector('.done');
  const undoneList = container.querySelector('.undone');
  const tasks = container.querySelectorAll('label');

  for (const task of tasks) {
    task.addEventListener('click', updateList);
  }

  function updateList(event) {
    const task = event.target;
    const currentList = task.parentElement;
    const targetList = currentList === doneList ? undoneList : doneList;
    task.checked = currentList === doneList;
    targetList.appendChild(task);
  } 
}

const lists = document.querySelectorAll('.todo-list');
Array.from(lists).forEach(item => TodoList(item));
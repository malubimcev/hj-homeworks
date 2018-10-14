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
    // const targetList = task.checked ? doneList : undoneList;//так работает только в одну сторону
    const targetList = task.parentElement ===  doneList ? undoneList : doneList;
    targetList.appendChild(task);
  } 
}

const lists = document.querySelectorAll('.todo-list');
Array.from(lists).forEach(item => TodoList(item));
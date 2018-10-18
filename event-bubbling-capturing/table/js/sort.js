'use strict';

function handleTableClick(event) {
  if (event.target.tagName === 'TH') {
    const table = document.querySelector('table');
    table.dataset.sortBy = event.target.dataset.propName;
    event.target.dataset.dir ? event.target.dataset.dir *= -1 : event.target.dataset.dir = 1;
    sortTable(event.currentTarget.dataset.sortBy, event.target.dataset.dir);    
  }
}
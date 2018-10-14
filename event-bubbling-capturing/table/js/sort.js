'use strict';

function handleTableClick(event) {
  const header = event.target.tagName === 'TH' ? event.target : event.currentTarget;
  const table = document.querySelector('table');//
  table.dataset.sortBy = header.dataset.propName;
  header.dataset.dir ? header.dataset.dir *= -1 : header.dataset.dir = 1;
  sortTable(event.currentTarget.dataset.sortBy, header.dataset.dir);
}
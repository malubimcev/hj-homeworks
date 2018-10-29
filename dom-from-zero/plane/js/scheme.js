'use strict';

const planeSelector = document.querySelector('#acSelect');
const btnSeatMap = document.querySelector('#btnSeatMap');
const btnSetFull = document.querySelector('#btnSetFull');
const btnSetEmpty = document.querySelector('#btnSetEmpty');
const mainView = document.querySelector('.main-view');
const seatMapTitle = mainView.querySelector('#seatMapTitle');
const seatMapDiv = mainView.querySelector('#seatMapDiv');
const totalPax = document.querySelector('#totalPax');
const totalAdult = document.querySelector('#totalAdult');
const totalHalf = document.querySelector('#totalHalf');

let currentPlane = {};

document.addEventListener('DOMContentLoaded', () => loadPlane(planeSelector.value));
planeSelector.addEventListener('change', () => loadPlane(planeSelector.value));
btnSeatMap.addEventListener('click', (event) => {
  event.preventDefault();
  drawMap(currentPlane);
});
btnSetFull.addEventListener('click', (event) => {
  event.preventDefault();
  setFull();
});
btnSetEmpty.addEventListener('click', (event) => {
  event.preventDefault();
  setEmpty();
});

function loadData(url) {
  return fetch(url)
    .then((res) => {
      if (200 <= res.status && res.status < 300) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
}

function loadPlane(planeType) {
  btnSetFull.disabled = true;
  btnSetEmpty.disabled = true;
  const url = 'https://neto-api.herokuapp.com/plane/';
  loadData(url + planeType).then(res => setPlane(res));
}

function setPlane(planeData) {
  currentPlane = planeData;
  seatMapTitle.textContent = currentPlane.title + ' (' + currentPlane.passengers + ' пассажиров)';
  seatMapDiv.querySelector('h3').textContent = '';
  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false; 
}

function clearMap() {
  const rows = seatMapDiv.querySelectorAll('.row');
  for (const row of rows) {
    seatMapDiv.removeChild(row);
  }
}

function drawMap(plane) {
  let rowCounter = 0;
  clearMap();
  const rows = plane.scheme.map(addRow);
  const rowsElement = rows.reduce((fragment, row) => {
    fragment.appendChild(row);
    return fragment;
  }, document.createDocumentFragment());
  seatMapDiv.appendChild(rowsElement);
  seatMapDiv.addEventListener('click', onMapClick);
  updateSummValues();
  return;
  
  function addRow(seatCount) {
    rowCounter++;

    const row = document.createElement('div');
    row.classList.add('row');
    row.classList.add('seating-row');
    row.classList.add('text-center');
    
    const rowHeaderWrap = document.createElement('div');
    rowHeaderWrap.classList.add('col-xs-1');
    rowHeaderWrap.classList.add('row-number');
    
    const rowHeader = document.createElement('h2');
    rowHeader.textContent = rowCounter;
    rowHeaderWrap.appendChild(rowHeader);
    row.appendChild(rowHeaderWrap);
    
    const leftRow = document.createElement('div');
    leftRow.classList.add('col-xs-5');
    const rightRow = leftRow.cloneNode(true);
    
    let rowSeats;
    if (seatCount > 0) {
      rowSeats = plane['letters' + seatCount].map(letter => addSeat(letter));
    } else {
      rowSeats = plane['letters6'].map(letter => addSeat(''));
    }
    
    const leftElement = rowSeats
      .slice(0, rowSeats.length / 2)
      .reduce((fragment, item) => {
        fragment.appendChild(item);
        return fragment;
      }, document.createDocumentFragment());
    const rightElement = rowSeats
      .slice(rowSeats.length / 2)
      .reduce((fragment, item) => {
        fragment.appendChild(item);
        return fragment;
      }, document.createDocumentFragment());
    leftRow.appendChild(leftElement);
    rightRow.appendChild(rightElement);
    row.appendChild(leftRow);
    row.appendChild(rightRow);

    return row;
  }
  
  function addSeat(letter) {
    const seat = document.createElement('div');
    seat.classList.add('col-xs-4');

    if (letter !== '') {
      seat.classList.add('seat');
      
      const seatLabel = document.createElement('span');
      seatLabel.classList.add('seat-label');
      seatLabel.textContent = letter;
      
      seat.appendChild(seatLabel);
    } else {
      seat.classList.add('no-seat');
    }

    return seat;
  }
}

function onMapClick(event) {
  let seat;
  if (event.target.classList.contains('seat')) {
    seat = event.target; 
  } else if (event.target.parentElement.classList.contains('seat')) {
    seat = event.target.parentElement;
  } else {
    return;
  }
  if (event.altKey) {
    seat.classList.toggle('half');
    seat.classList.remove('adult');
  } else {
    seat.classList.toggle('adult');
    seat.classList.remove('half');
  }
  updateSummValues();
}

function updateSummValues() {
  const adults = Array.from(seatMapDiv.querySelectorAll('.adult'));
  const halfs = Array.from(seatMapDiv.querySelectorAll('.half'));
  totalPax.textContent = adults.length + halfs.length;
  totalAdult.textContent = adults.length;
  totalHalf.textContent = halfs.length;
}

function setFull() {
  const seats = seatMapDiv.querySelectorAll('.seat');
  for (const seat of seats) {
    seat.classList.add('adult');
  }
  updateSummValues();
}

function setEmpty() {
  const seats = seatMapDiv.querySelectorAll('.seat');
  for (const seat of seats) {
    seat.classList.remove('adult');
    seat.classList.remove('half');
  }
  updateSummValues();
}
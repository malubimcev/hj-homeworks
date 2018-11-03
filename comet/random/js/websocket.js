'use strict';

const websocket = document.querySelector('.websocket');

const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

ws.addEventListener('message', (event) => showDiv(websocket, event.data));
ws.addEventListener('error', (err) => console.log(err.message));

function showDiv(section, num) {
  const divs = section.querySelectorAll('div');
  for (const div of divs) {
    div.textContent === num ? div.classList.add('flip-it') : div.classList.remove('flip-it');;
  }
}
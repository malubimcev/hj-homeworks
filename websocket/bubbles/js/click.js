'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('error', (error) => console.log(`error: ${error.data}`));
document.addEventListener('DOMContentLoaded', () => showBubbles(connection));
document.addEventListener('click', onClick);
document.addEventListener('dblclick', () => connection.close(1000));
window.addEventListener('beforeunload', () => connection.close(1000));

function onClick(event) { 
  connection.send(JSON.stringify({
      x: event.pageX,
      y: event.pageY
    }));
}
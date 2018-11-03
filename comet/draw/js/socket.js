'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

document.addEventListener('dblclick', () => {
  ws.close(1000);
  console.log('disconnected');
});

ws.addEventListener('open', () => {
  console.log('connected');
});

ws.addEventListener('error', (err) => {
  console.log('wss error: ' + err.message);
});

editor.addEventListener('update', event => {
  const canvas = event.canvas;
  const image = canvas.toBlob((blob) => ws.send(blob));
});
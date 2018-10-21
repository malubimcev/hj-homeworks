'use strict';

const counterOutput = document.querySelector('.counter');
const errorOutput =  document.querySelector('.errors');
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('message', (event) => onMessage(event));
connection.addEventListener('error', (error) => console.log(`error: ${error.data}`));
document.addEventListener('DOMContentLoaded', () => showBubbles(connection));
document.addEventListener('dblclick', () => connection.close(1000));
window.addEventListener('beforeunload', () => connection.close(1000));

function onMessage(event) {
  console.log(`message: ${event.data}`)
  try {
    const conInfo = JSON.parse(event.data);
    counterOutput.textContent = conInfo.connections;
    errorOutput.textContent = conInfo.errors;
  } catch (err) {
    console.log(err);
  }
}
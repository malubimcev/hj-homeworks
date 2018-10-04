'use strict';

const nav = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];
let currentCode = '';//переменная для накопления потока символов

function openMenu(event) {
  if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
    nav.classList.toggle('visible');
  }
  handleKey(event.code);
}

function setEvents() {
  document.addEventListener('keydown', openMenu);
}

function handleKey(code) {
  const secretCode = 'YTNJKJUBZ';//НЕТОЛОГИЯ
  const char = code.replace('Key', '');

  function saveChar(currentChar) {
    currentCode += currentChar.toUpperCase();
    if (currentCode.length > secretCode.length) {
      currentCode = currentCode.slice(-secretCode.length);
    }
    return currentCode;
  }

  if (saveChar(char).indexOf(secretCode) > -1) {
    secret.classList.add('visible');
  }
}

setEvents();
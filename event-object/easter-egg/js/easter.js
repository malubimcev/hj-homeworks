'use strict';

const nav = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];
let currentCode = '';//переменная для накопления потока символов

function openMenu(event) {
  if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
    nav.classList.toggle('visible');
  }
  if (event.type === 'keypress') {
    handleKey(event.key);
  }
}

function closeMenu(event) {
  nav.classList.remove('visible');    
}

function showSecret() {
  secret.classList.add('visible');
}

function setEvents() {
  document.addEventListener('keydown', openMenu);
  document.addEventListener('keypress', openMenu);
  document.addEventListener('click', closeMenu);
}

function handleKey(char) {
  const secretCode = 'НЕТОЛОГИЯ';

  function saveChar(currentChar) {
    currentCode += currentChar.toUpperCase();
    if (currentCode.length > secretCode.length) {
      currentCode = currentCode.slice(-secretCode.length);
    }
    return currentCode;
  }
  
  if (saveChar(char).indexOf(secretCode) > -1) {
    showSecret();
  }
}

setEvents();
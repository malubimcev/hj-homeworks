'use strict';

const sounds = [
  '/first.mp3',
  '/second.mp3',
  '/third.mp3',
  '/fourth.mp3',
  '/fifth.mp3'
];

const modes = [
  'lower',
  'middle',
  'higher'
];

const linkPrefix = 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/';
//const linkPrefix = 'sounds/';
const piano = document.getElementsByTagName('ul')[0];
const keys = piano.getElementsByTagName('li');
let currentMode = 1;

function setEvents() {
  document.addEventListener('keydown', changeMode);
  document.addEventListener('keyup', defaultMode);
  defaultMode();
  let i = 0;
  for (const key of keys) {
    key.addEventListener('click', playSound);
    const audio = key.getElementsByTagName('audio')[0];
    audio.src = linkPrefix + modes[currentMode] + sounds[i];
    i++;
  }
}

function changeMode(event) {
  setCurrentMode(event);
  removeMode();
  piano.classList.add(modes[currentMode]);
}

function removeMode() {
  modes.forEach(mode => piano.classList.remove(mode));
}

function defaultMode() {
  currentMode = 1;
  removeMode();
  piano.classList.add(modes[currentMode]);
}

function playSound(event) {
  //setCurrentMode(event);
  const audio = this.getElementsByTagName('audio')[0];
  const url = audio.src.split('/');
  url[url.length - 2] = modes[currentMode];
  audio.src = url.join('/');
  audio.play();
}

function setCurrentMode(event) {
  if (event.shiftKey) {
    currentMode = 0;
  } else if (event.altKey) {
    currentMode = 2;
  } else {
    currentMode = 1;
  }
}

setEvents();
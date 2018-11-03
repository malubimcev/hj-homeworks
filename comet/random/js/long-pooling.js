'use strict';

const longPooling = document.querySelector('.long-pooling');
const longPoolingURL = 'https://neto-api.herokuapp.com/comet/long-pooling';

function showDiv(section, num) {
  const divs = section.querySelectorAll('div');
  for (const div of divs) {
    div.textContent === num ? div.classList.add('flip-it') : div.classList.remove('flip-it');;
  }
}

function getLongPoolingData(url) {
  const xhr = new XMLHttpRequest();
  
  function onLongDataLoad() {
    showDiv(longPooling, xhr.responseText.trim());
    getLongPoolingData(url);
  }
  
  xhr.addEventListener('load', onLongDataLoad);
  xhr.open("GET", url, true);
  xhr.send();
}

getLongPoolingData(longPoolingURL);
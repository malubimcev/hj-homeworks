'use strict';

const pooling = document.querySelector('.pooling');
const poolingURL = 'https://neto-api.herokuapp.com/comet/pooling';

function showDiv(section, num) {
  const divs = section.querySelectorAll('div');
  for (const div of divs) {
    div.textContent === num ? div.classList.add('flip-it') : div.classList.remove('flip-it');;
  }
}

function getPoolingData(url) {
  const xhr = new XMLHttpRequest();
    
  function onDataLoad() {
    showDiv(pooling, xhr.responseText.trim());
    setTimeout(() => xhr.send(), 7000);
  }

  xhr.addEventListener('load', onDataLoad);
  xhr.open("GET", url, true);
  xhr.send();
}

getPoolingData(poolingURL);
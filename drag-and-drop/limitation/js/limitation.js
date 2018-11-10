'use strict';

const block = document.querySelector('.block');
const message = document.querySelector('.message');
const textarea = document.querySelector('.textarea');

const onStop = debounce(() => {
  block.classList.remove('active');
  message.classList.add('view');
}, 2000);
                        
const onPrinting = () => {
  block.classList.add('active');
  message.classList.remove('view');
}

textarea.addEventListener('keydown', onPrinting);
textarea.addEventListener('keyup', onStop);
textarea.addEventListener('focus', onPrinting);
textarea.addEventListener('blur', () => block.classList.remove('active'));


function debounce(callback,  delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback();
    }, delay);
  };
};
'use strict';

const block = document.querySelector('.block');
const message = document.querySelector('.message');
const textarea = document.querySelector('.textarea');
let timeout;

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
textarea.addEventListener('blur', (e) => {
  clearTimeout(timeout);
  block.classList.remove('active');
  message.classList.remove('view');
});


function debounce(callback,  delay) {
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback();
    }, delay);
  };
};
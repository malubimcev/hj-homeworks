'use strict';

function Slider(container) {
  container.querySelector('.slide').classList.add('slide-current');
  const buttons = Array.from(container.querySelectorAll('.slider-nav a'));
  buttons.forEach(btn => btn.addEventListener('click', moveSlide));
  
  function moveSlide(event) {
    const currentSlide = container.querySelector('.slide-current');
    let activatedSlide;
    switch (event.target.dataset.action) {
      case 'next':
        activatedSlide = currentSlide.nextElementSibling;
        event.target.disabled = activatedSlide.nextElementSibling ? false : true;
        break;
      case 'prev':
        activatedSlide = currentSlide.previousElementSibling;
        event.target.disabled = activatedSlide.previousElementSibling ? false : true;
        break;
      case 'first':
        activatedSlide = currentSlide.parentElement.firstElementChild;
        event.target.disabled = activatedSlide.previousElementSibling ? false : true;
        break;
      case 'last':
        activatedSlide = currentSlide.parentElement.lastElementChild;
        event.target.disabled = activatedSlide.nextElementSibling ? false : true;
        break;
    }
    currentSlide.classList.remove('slide-current');
    activatedSlide.classList.add('slide-current');    
  }
}

const sliders = document.querySelectorAll('.slider');
Array.from(sliders).forEach(item => Slider(item));
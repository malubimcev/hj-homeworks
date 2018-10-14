'use strict';

function Slider(container) {
  const firstSlide = container.querySelector('.slide')
  firstSlide.classList.add('slide-current');
  const buttons = Array.from(container.querySelectorAll('.slider-nav a'));
  buttons.forEach(btn => btn.addEventListener('click', moveSlide));
  setDisabled(firstSlide);

  function moveSlide(event) {
    const currentSlide = container.querySelector('.slide-current');
    let activatedSlide;
    switch (event.target.dataset.action) {
      case 'next':
        activatedSlide = currentSlide.nextElementSibling;
        break;
      case 'prev':
        activatedSlide = currentSlide.previousElementSibling;
        break;
      case 'first':
        activatedSlide = currentSlide.parentElement.firstElementChild;
        break;
      case 'last':
        activatedSlide = currentSlide.parentElement.lastElementChild;
        break;
    }
    if (activatedSlide) {
      currentSlide.classList.remove('slide-current');
      activatedSlide.classList.add('slide-current');
    }
    setDisabled(activatedSlide);//
  }
  
  function setDisabled(slide) {
    buttons
      .filter(btn => btn.dataset.action === 'next' || btn.dataset.action === 'last')
      .forEach(btn => slide.nextElementSibling ? btn.classList.remove('disabled') : btn.classList.add('disabled'));
    buttons
      .filter(btn => btn.dataset.action === 'prev' || btn.dataset.action === 'first')
      .forEach(btn => slide.previousElementSibling ? btn.classList.remove('disabled') : btn.classList.add('disabled'));    
  }
}

const sliders = document.querySelectorAll('.slider');
Array.from(sliders).forEach(item => Slider(item));
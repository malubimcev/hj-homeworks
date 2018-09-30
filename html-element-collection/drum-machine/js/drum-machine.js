function playSound() {
  const player = this.getElementsByTagName('audio')[0];
  player.play();
}

function setEvents() {
  const buttons = document.getElementsByClassName('drum-kit__drum');

  if (buttons) {
    for (const btn of buttons) {
      btn.addEventListener('click', playSound);
    }
  }
}

setEvents();
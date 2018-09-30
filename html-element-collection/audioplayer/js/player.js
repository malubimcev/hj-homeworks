// Список песен:
const playList = [
  {
    title: 'LA Chill Tour',
    source: './mp3/LA Chill Tour.mp3'
  },
  {
    title: 'This is it band',
    source: './mp3/This is it band.mp3'
  },
  {
    title: 'LA Fusion Jam',
    source: './mp3/LA Fusion Jam.mp3'
  }
];

let playListPosition = 0;

const playerWrapper = document.getElementsByClassName('mediaplayer')[0];
const player = playerWrapper.getElementsByTagName('audio')[0];
const controls = playerWrapper.getElementsByClassName('controls')[0];
const title = controls.getElementsByClassName('title')[0];
const playPauseBtn = controls.getElementsByClassName('playstate')[0];
const stopBtn = controls.getElementsByClassName('stop')[0];
const nextBtn = controls.getElementsByClassName('next')[0];
const backBtn = controls.getElementsByClassName('back')[0];

function setEvents() {
  stopBtn.addEventListener('click', stop);
  nextBtn.addEventListener('click', next);
  backBtn.addEventListener('click', back);
  playPauseBtn.addEventListener('click', togglePlayPause);
}

function initSong() {
  title.title = playList[playListPosition].title;
  player.src = playList[playListPosition].source;
  if (isPlayMode()) {
  	player.play();
  }
}

function initPlayer() {
  setEvents();
  initSong();
}

function isPlayMode() {
  return playerWrapper.classList.contains('play');
}

function togglePlayPause() {
  playerWrapper.classList.toggle('play');
  if (isPlayMode()) {
    player.play();
  } else {
    player.pause();
  }
}

function stop() {
  playerWrapper.classList.remove('play');
  player.pause();
  player.currentTime = 0;
}

function next() {
  playListPosition++;
  if (playListPosition > playList.length - 1) {
    playListPosition = 0;
  }
  initSong();
}

function back() {
  playListPosition--;
  if (playListPosition < 0) {
    playListPosition = playList.length - 1;
  }
  initSong();
}

initPlayer();
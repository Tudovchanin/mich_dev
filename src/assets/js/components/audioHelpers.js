
function soundPlay(sound) {
  sound.play();
};

function soundPause(sound, reset = null) {
  sound.pause();
  if(reset) {
    sound.currentTime = 0;
  }
};

function toggleAudio({ el, className, playCallback, pauseCallback, sound }) {
  if (el.classList.contains(className)) {
    playCallback(sound);
  } else {
    pauseCallback(sound);
  }

}
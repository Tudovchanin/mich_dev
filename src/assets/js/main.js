"use strict";


//= components/dance_man.js
//= components/switch_theme.js
//= components/slider_hero.js
//= components/canvas.js
//= components/audioHelpers.js
//= components/slider28.js
document.addEventListener('DOMContentLoaded', function () {

  // Switch theme
  const $themeSwitcherArr = document.querySelectorAll('.theme-switcher');
  const soundSwitchTheme = new Audio('assets/audio/sound-theme.mp3');
  if ($themeSwitcherArr) {
    switchTheme($themeSwitcherArr, soundPlay, soundSwitchTheme);
  }

  // Dance man Header
  const $manHeader = document.querySelector('.header-content .man-sprite');
  const $danceHeaderBtn = document.querySelector('.header-content__dance-btn');
  const audioDance = new Audio('assets/audio/michael_jackson.mp3');
  const audioObj = {
    el: $manHeader,
    className: 'man-sprite--dance',
    playCallback: soundPlay,
    pauseCallback: soundPause,
    sound: audioDance,
  };
  const audioBtnDance = new Audio('assets/audio/sound-dance-button.mp3')

  if ($manHeader && $danceHeaderBtn) {
    $danceHeaderBtn.addEventListener('click', () => {
      danceMan($manHeader, $danceHeaderBtn);
      toggleAudio(audioObj);
      soundPlay(audioBtnDance);
    })



  }

  // Sound button Slider

  const soundSlider = new Audio('assets/audio/sound-slider-button.mp3');

  if (document.querySelectorAll('.hero__slider-item')[0]) {

    // Slider Hero
    const sliderHero = {
      allSlideItem: document.querySelectorAll('.hero__slider-item'),
      lazyLoadImages: document.querySelectorAll('.lazy-load-hero'),
      btnPrev: document.querySelector('.hero__slider-btn--prev'),
      btnNext: document.querySelector('.hero__slider-btn--next'),
      arrPathImg: ['rocket-takeoff.jpg', 'view-from-the-rocket.jpg', 'galaxy.jpg', 'astronaut-on-the-planet.jpg', 'flower-in-a-vase.jpg'],
      varImg: '--bg-image',
      sound: soundSlider,
      resetSound: true,
      callbackPlay: soundPlay,
      callbackPause: soundPause,
    };

    slider29(sliderHero);
  }


  // canvas

  let $containerCanvas = document.querySelector('.container-canvas');
  let $canvas = document.getElementById('starsCanvas');

  if ($containerCanvas && $canvas) {
    setCanvas($containerCanvas, $canvas);
  }

  // link style

const $linkCube = document.querySelectorAll('.cube');

if ($linkCube[0]) {



  $linkCube.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const targetElement = e.currentTarget;
      targetElement.classList.add('fast-rotate');
    
      setTimeout(() => {
        targetElement.classList.remove('fast-rotate');
        window.open(el.href);
       
      }, 500);
    });
  })

  
}



});

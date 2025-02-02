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


  // Dance man Header and run dog
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

  const $runDog = document.querySelector('.run-dog');
  if ($manHeader && $danceHeaderBtn) {
    $danceHeaderBtn.addEventListener('click', () => {
      danceMan($manHeader, $danceHeaderBtn);
      toggleAudio(audioObj);
      soundPlay(audioBtnDance);
      $runDog.classList.toggle('run-dog-run',  $manHeader.classList.contains('man-sprite--dance'));
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

  const $containerCanvas = document.querySelector('.container-canvas');
  const $canvas = document.getElementById('starsCanvas');

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
  // animation

  const itemsHidden = document.querySelectorAll(".hidden-animation");
  const optionHidden = {
    observerOptions: {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    }
  }


  if (itemsHidden) {

    function initObserver(
      items,
      {
        visibleClass = "visible-animation",
        hiddenClass = "hidden-animation",
        observerOptions = {
          root: null,
          rootMargin: "0px",
          threshold: 1,
        },
        unobserve = false,
      }
    ) {

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Элемент в зоне видимости:", entry.target);
            entry.target.classList.add(visibleClass);
            entry.target.classList.remove(hiddenClass);


            if (unobserve) {
              observer.unobserve(entry.target);
            }
          } else {

            entry.target.classList.remove(visibleClass);
            entry.target.classList.add(hiddenClass);
          }
        });
      }, observerOptions);

      items.forEach((item) => observer.observe(item));
    }

    initObserver(itemsHidden, optionHidden);
  }


  //  Dog mk

  const $allCardGradient = document.querySelectorAll('.advantages-list__item');
  const $dog = document.querySelector('.dog');
  const soundDogMk = new Audio('assets/audio/mortal_combat_toasty.mp3');
  let flagVisibleDog = false;
  if ($allCardGradient[0]) {

    $allCardGradient.forEach((card, index) => {

      card.addEventListener('click', (e) => {

        const indexShowDog = getRandomValue(0, 0);

        if (index === indexShowDog) {
         

          if (!flagVisibleDog) {
            console.log('show dog');
            flagVisibleDog = true;
            $dog.classList.remove('hidden-dog');
            soundPlay(soundDogMk);
            

            setTimeout(() => {
              $dog.classList.add('hidden-dog');
              flagVisibleDog = false;
            }, 1000);
          }
        }
      })
    })
  }

  // function get random value

  function getRandomValue(min, max) {

    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
  }

});

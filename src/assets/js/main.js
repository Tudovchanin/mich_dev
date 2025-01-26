"use strict";


//= components/dance_man.js
//= components/switch_theme.js
//= components/script3.js

document.addEventListener('DOMContentLoaded', function () {
  const $themeSwitcherArr = document.querySelectorAll('.theme-switcher');
  if ($themeSwitcherArr) {
    switchTheme($themeSwitcherArr);
  }
  const $manHeader = document.querySelector('.header-content .man-sprite');
  const $danceHeaderBtn = document.querySelector('.header-content__dance-btn');
  console.log($manHeader);
  danceMan($manHeader, $danceHeaderBtn);
  
});

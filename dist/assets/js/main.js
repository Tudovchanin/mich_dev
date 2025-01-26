"use strict";




function danceMan(man, btn) {
	btn.addEventListener('click', ()=> {
		man.classList.toggle('man-sprite--dance')
	})
	
}


function switchTheme(allSwitchers) {

  allSwitchers.forEach(el => {

    el.addEventListener('click', () => {

      allSwitchers.forEach(el => {
        el.classList.toggle('theme-switcher--off');
      })
      document.body.classList.toggle('white-theme-body', !el.classList.contains('theme-switcher--off'))
  
    });
  })






}
console.log(3)

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
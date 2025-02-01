

function switchTheme(allSwitchers, callBackSound, sound) {

  allSwitchers.forEach(el => {

    el.addEventListener('click', () => {
      if(callBackSound && sound) {
        callBackSound(sound);
      }
      allSwitchers.forEach(el => {
        el.classList.toggle('theme-switcher--off');
      })
      document.body.classList.toggle('white-theme-body', !el.classList.contains('theme-switcher--off'))
  
    })
  })






}
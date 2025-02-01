


function slider29({
  btnNext,
  btnPrev,
  allSlideItem,
  lazyLoadImages,
  arrPathImg,
  varImg,
  callbackPlay = null,
  callbackPause = null,
  sound = null,
  resetSound = false
}) {

  let activeSlide = 0;

  btnNext.addEventListener('click', async () => {

    if (callbackPlay && sound) {
      callbackPause(sound, resetSound)
      setTimeout(() => {
        callbackPlay(sound);
      }, 100);
    }

    allSlideItem[activeSlide].classList.remove('active-slide-29');

    activeSlide = (activeSlide + 1) % allSlideItem.length;
    console.log(allSlideItem.length);
    if (activeSlide !== 0) {

      await loadImages(lazyLoadImages[activeSlide]);
    }

    allSlideItem[activeSlide].classList.add('active-slide-29');


    updateBackgroundImage(arrPathImg[activeSlide]);

  });

  btnPrev.addEventListener('click', async () => {

    allSlideItem[activeSlide].classList.remove('active-slide-29');

    activeSlide = !activeSlide ? allSlideItem.length - 1 : activeSlide - 1;
    await loadImages(lazyLoadImages[activeSlide]);

    allSlideItem[activeSlide].classList.add('active-slide-29');


    updateBackgroundImage(arrPathImg[activeSlide]);


  });


  function updateBackgroundImage(imageUrl) {
    document.documentElement.style.setProperty(varImg, `url(../img/${imageUrl})`);
  }

  function loadImages(image) {
    if (!image.hasAttribute('src')) {
      image.src = `./assets/img/${arrPathImg[activeSlide]}`;
    }
  }


}








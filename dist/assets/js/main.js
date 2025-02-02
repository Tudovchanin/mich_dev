"use strict";



function danceMan(man, btn) {
	man.classList.toggle('man-sprite--dance');
	btn.classList.toggle('dance-btn--active');
}


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


// canvas секция  --------------------------------------------

// Находим элемент с классом 'banner' и элемент canvas по его ID

function setCanvas(containerCanvas, canvas) {

	// Устанавливаем ширину и высоту canvas равными его отображаемым размерам
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

	// Получаем контекст рисования 2D для canvas
	const ctx = canvas.getContext('2d');

	// Создаем массив для хранения stars
	const stars = [];

	// Массив с цветами для stars
	const arrayColors = ['#0000CD', '#D2691E', '#FF00FF', '#7B68EE'];

	// Генерируем 50 случайных star и добавляем их в массив stars
	for (let index = 0; index < 200; index++) {
		stars.push({
			x: Math.floor(Math.random() * canvas.width), // Случайная позиция по оси X
			y: Math.floor(Math.random() * canvas.height), // Случайная позиция по оси Y
			size: Math.random() * 3 + 5, // Случайный размер star (от 5 до 8)
			color: arrayColors[Math.floor(Math.random() * 4)] // Случайный цвет из массива
		});
	}

	// Функция для рисования звезд на canvas
	const drawStars = () => {
		stars.forEach(star => {
			ctx.fillStyle = star.color; // Устанавливаем цвет для текущей звезды
			ctx.beginPath(); // Начинаем новый путь

			const spikes = 5; // Количество лучей звезды
			const outerRadius = star.size; // Внешний радиус (размер звезды)
			const innerRadius = star.size / 2; // Внутренний радиус (размер углубления звезды)

			// Угол 
			let angle = Math.PI / spikes;

			// Рисуем звезду
			for (let i = 0; i < spikes * 2; i++) {
				const radius = (i % 2 === 0) ? outerRadius : innerRadius; // Чередуем радиусы
				const x = star.x + Math.cos(angle * i) * radius; // Вычисляем координату X
				const y = star.y + Math.sin(angle * i) * radius; // Вычисляем координату Y
				ctx.lineTo(x, y); // Добавляем точку к пути
			}

			ctx.closePath(); // Закрываем путь
			ctx.fill(); // Заполняем звезду цветом
		});
	}

	drawStars();




	// Добавляем обработчик события 'mousemove' на элемент containerCanvas
	containerCanvas.addEventListener('mousemove', (event) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas

		drawStars();

		// Получаем координаты мыши относительно элемента containerCanvas

		let mouse = {
			x: event.clientX - containerCanvas.getBoundingClientRect().left,
			y: event.clientY - containerCanvas.getBoundingClientRect().top
		};

		// Проверяем расстояние от мыши до каждой точки
		stars.forEach(star => {
			let distance = Math.sqrt((mouse.x - star.x) ** 2 + (mouse.y - star.y) ** 2); // Вычисляем расстояние
			if (distance < 200) { // Если расстояние меньше 300 пикселей
				ctx.strokeStyle = star.color; // Устанавливаем цвет для линии
				ctx.lineWidth = 1; // Устанавливаем ширину линии
				ctx.beginPath(); // Начинаем новый путь
				ctx.moveTo(star.x, star.y); // Перемещаемся к точке
				ctx.lineTo(mouse.x, mouse.y); // Рисуем линию к мыши
				ctx.stroke(); // Отрисовываем линию
			}
		});
	});

	// Добавляем обработчик события 'mouseout' на элемент containerCanvas
	containerCanvas.addEventListener('mouseout', () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas

		drawStars();
	});

	// Добавляем обработчик события 'resize' на окно
	window.addEventListener('resize', () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas
		canvas.width = containerCanvas.offsetWidth; // Устанавливаем ширину canvas равной ширине banner
		canvas.height = containerCanvas.offsetHeight; // Устанавливаем высоту canvas равной высоте banner

		// Очищаем массив stars и генерируем новые точки
		stars.length = 0; // Очищаем массив
		for (let index = 0; index < 100; index++) {
			stars.push({
				x: Math.floor(Math.random() * canvas.width), // Случайная позиция по оси X
				y: Math.floor(Math.random() * canvas.height), // Случайная позиция по оси Y
				size: Math.random() * 3 + 5, // Случайный размер точки (от 5 до 8)
				color: arrayColors[Math.floor(Math.random() * 5)] // Случайный цвет из массива
			});
		}
		drawStars();
	});
}

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


if (document.querySelectorAll('.container-slider-28')[0]) {

  class Slider {
    // Конструктор класса Slider, принимает объект mediaQueries
    constructor(mediaQueries) {
      this.mediaQueries = mediaQueries;  // Медиа-запросы для определения количества видимых слайдов
    }


    // Метод инициализации слайдера, принимает объект с параметрами
    initSlider({
      btnNext = null,
      btnPrev = null,
      slider, item,
      itemLength }) {
      this.flagDragDropMouse = false; // Флаг dragDrop для desktop
      this.flagDragDropTouch = false; // Флаг dragDrop для touch устройств


      this.windowWidth = document.documentElement.clientWidth;  // Ширина окна

      this.elemItem = item;  // Один элемент слайдера
      this.elemBtnNext = btnNext;  // Кнопка для перехода к следующему слайду
      this.elemBtnPrev = btnPrev;  // Кнопка для перехода к предыдущему слайду
      this.elemSlider = slider;  // Сам слайдер


      this.stepNumber = 1; // Текущий шаг
      this.position = 0;  // Начальная позиция слайдера
      this.sliderLength = itemLength;  // Количество элементов item слайдера
      this.visibleSlides = this.getVisibleSlidesMediaQueries(this.mediaQueries);  // Количество видимых слайдов
      this.distance = this.updateWidthItem();  // Ширина одного элемента слайдера
      this.setTotalSteps();

      this.onResize = this.handleResize.bind(this); // обработчик события resize
      this.onDOMLoaded = this.handleDOMLoaded.bind(this); // обработчик события DOMContentLoaded


      // Установка обработчика события, когда документ полностью загружен
      document.addEventListener('DOMContentLoaded', this.onDOMLoaded);

      // Обработчик события изменения размера окна
      window.addEventListener('resize', this.onResize);


      // Установка обработчиков событий для кнопок вперед / назад
      if (this.elemBtnNext && this.elemBtnPrev) {

        this.onclickNext = this.handleClickNext.bind(this);
        this.onclickPrev = this.handleClickPrev.bind(this);


        this.elemBtnNext.addEventListener('click', this.onclickNext);
        this.elemBtnPrev.addEventListener('click', this.onclickPrev);
      }
    }

    dispatchSlideChangeEvent() {
      const event = new CustomEvent('slideChanged', {
        bubbles: true,
        detail: {
          currentStep: this.stepNumber,
          totalSteps: this.totalSteps,
        },
      });

      this.elemSlider.dispatchEvent(event);
    }

    initStepsCallback(callBack) {
      this.callBackSteps = callBack;
    }

    initResizeCallback(callback) {
      this.callBackResize = callback;
    }


    // Удаление событий
    removeAllListener() {

      document.removeEventListener('DOMContentLoaded', this.onDOMLoaded);
      window.removeEventListener('resize', this.onResize);

      if (this.elemBtnNext && this.elemBtnPrev) {
        this.elemBtnNext.removeEventListener('click', this.onclickNext);
        this.elemBtnPrev.removeEventListener('click', this.onclickPrev);
      }

      if (this.flagDragDropMouse) {

        // Обработчики событий для мыши
        this.elemSlider.removeEventListener('mousedown', this.onmousedown, { passive: false });

        this.elemSlider.removeEventListener('mousemove', this.onmousemove, { passive: false });

        document.removeEventListener('mouseup', this.onmouseup);
      }

      if (this.flagDragDropTouch) {

        this.elemSlider.removeEventListener('touchstart', this.ontouchstart, { passive: false });
        this.elemSlider.removeEventListener('touchmove', this.ontouchmove, { passive: false });
        document.removeEventListener('touchend', this.ontouchend);

      }
    }

    handleClickNext() {
      this.moveNext();
      this.updateButtonStates();
      this.setSlideStep();
    }

    handleClickPrev() {
      this.movePrev();
      this.updateButtonStates();
      this.setSlideStep();
    }

    handleResize() {

      let newWindowWidth = document.documentElement.clientWidth;
      if (newWindowWidth === this.windowWidth) return;
      this.resetSlider();
      this.distance = this.updateWidthItem();
      this.visibleSlides = this.getVisibleSlidesMediaQueries(this.mediaQueries);
      this.updateButtonStates();
      this.setTotalSteps();
      this.windowWidth = newWindowWidth;
      this.dispatchSlideChangeEvent();
      if (this.callBackSteps) {
        this.callBackSteps(this.stepNumber, this.totalSteps);
      }
      if (this.callBackResize) {
        this.callBackResize();
      }

    }

    handleDOMLoaded() {
      this.updateButtonStates();
      this.setTotalSteps();
      this.dispatchSlideChangeEvent();
      if (this.callBackSteps) {
        this.callBackSteps(this.stepNumber, this.totalSteps);
      }

    }


    initDragDrop(desktop = false) {
      this.flagDragDropTouch = true;
      this.isDragging = false;  // Флаг перетаскивания
      this.touchStart = 0;  // Начальная точка касания/клика
      this.touchEnd = 0;  // Конечная точка касания/клика
      this.touchMove = 0;  // Текущая позиция перетаскивания
      this.ontouchstart = this.handleStart.bind(this);
      this.ontouchmove = this.handleMove.bind(this);
      this.ontouchend = this.handleEnd.bind(this);

      // Обработчик события начала касания
      this.elemSlider.addEventListener('touchstart', this.ontouchstart, { passive: false });

      // Обработчик события перемещения касания
      this.elemSlider.addEventListener('touchmove', this.ontouchmove, { passive: false });

      // Обработчик события завершения касания
      document.addEventListener('touchend', this.ontouchend);

      if (!desktop) return;
      this.flagDragDropMouse = true;

      this.onmousedown = this.handleStart.bind(this);
      this.onmousemove = this.handleMove.bind(this);
      this.onmouseup = this.handleEnd.bind(this);

      // Обработчики событий для мыши
      this.elemSlider.addEventListener('mousedown', this.onmousedown, { passive: false });

      this.elemSlider.addEventListener('mousemove', this.onmousemove, { passive: false });

      document.addEventListener('mouseup', this.onmouseup);
    }

    handleStart(e) {
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      this.startDragDrop(clientX);

    }

    handleMove(e) {
      if (!this.isDragging) return;
      // e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      this.moveDragDrop(clientX);
    }

    handleEnd(e) {
      if (!this.isDragging) return;
      // e.preventDefault();
      this.endDragDrop();

    }

    // Метод начала перетаскивания
    startDragDrop(value) {
      this.isDragging = true;
      this.touchStart = value;
    }

    // Метод перемещения при перетаскивании
    moveDragDrop(value) {
      this.touchMove = value - this.touchStart + this.position;
      this.animateSlider(this.elemSlider, this.touchMove);
      this.touchEnd = value;
    }

    // Метод завершения перетаскивания
    endDragDrop() {
      this.isDragging = false;
      this.position = this.touchMove;

      setTimeout(() => {
        // Если позиция больше 0, вернуться к началу
        if (this.position > 0) {
          this.animateSlider(this.elemSlider, 0);
          this.position = 0;

          this.setSlideStep();

          // Если позиция меньше конца слайдера, вернуться к концу
        } else if (this.position < this.sliderEnd()) {
          this.animateSlider(this.elemSlider, this.sliderEnd());
          this.position = this.sliderEnd();
          this.setSlideStep();
          // Если перетаскивание было значительным, перейти на следующий слайд
        } else if (this.touchEnd - this.touchStart < -20) {
          this.position = this.distance * (Math.floor(this.position / this.distance));

          this.setSlideStep();
          this.animateSlider(this.elemSlider, this.position);

          // Если перетаскивание было значительным, перейти на предыдущий слайд
        } else if (this.touchEnd - this.touchStart > 20) {
          this.position = this.distance * (Math.ceil(this.position / this.distance));

          this.setSlideStep();
          this.animateSlider(this.elemSlider, this.position);
          // Иначе, оставить на текущем слайде

        } else {
          this.position = this.distance * (Math.round(this.position / this.distance));
          this.animateSlider(this.elemSlider, this.position);
        }
        this.updateButtonStates();
        this.dispatchSlideChangeEvent();
      }, 100);
    }

    // Метод вычисления конца слайдера
    sliderEnd() {
      return -(this.sliderLength * this.distance - this.visibleSlides * this.distance);
    }

    // Метод установки общего количества шагов
    setTotalSteps() {
      this.totalSteps = this.sliderLength - this.visibleSlides + 1;
    }

    // Метод установки текущего шага
    setSlideStep() {
      if (this.position > 0) return;
      const valueStep = Math.abs(this.position / this.distance) + 1;
      this.stepNumber = valueStep;

      if (this.callBackSteps) {
        this.callBackSteps(this.stepNumber, this.totalSteps);
      }
      this.dispatchSlideChangeEvent();
    }

    // Метод получения количества видимых слайдов по медиа-запросам
    getVisibleSlidesMediaQueries(media) {
      for (let key in media) {
        if (media[key].matches) {
          return parseInt(key);
        }
      }
    }

    // Метод обновления ширины элемента
    updateWidthItem() {
      return this.elemItem.offsetWidth;
    }

    //Метод проверки кнопок для отключения или включения
    updateButtonStates() {
      if (this.elemBtnNext) {
        this.elemBtnNext.disabled = this.position <= this.sliderEnd();
      }
      if (this.elemBtnPrev) {
        this.elemBtnPrev.disabled = this.position >= 0;
      }
    }

    // Метод перехода к следующему слайду
    moveNext() {
      const valueEnd = this.visibleSlides * this.distance - this.distance * this.sliderLength;
      if (this.position <= valueEnd) return;

      this.position = this.position - this.distance;
      this.animateSlider(this.elemSlider, this.position);
    }

    // Метод перехода к предыдущему слайду
    movePrev() {

      if (this.position === 0) return;

      this.position = this.position + this.distance;
      this.animateSlider(this.elemSlider, this.position);
    }

    // Метод анимации слайдера
    animateSlider(elem, valueTranslate) {
      requestAnimationFrame(() => {
        elem.style.transform = `translateX(${valueTranslate}px)`;
      });
    }

    // Метод сброса слайдера
    resetSlider() {
      this.stepNumber = 1;
      this.position = 0;
      this.animateSlider(this.elemSlider, this.position);
    }
  }



  // Объект медиа-запросов, в ключах прописываем сколько видно слайдов, в css устанавливаем какое количество слайдов  видно,  например:
  //  .item {
  // 	flex-shrink: 0;
  // 	flex-grow: 0;
  // 	width: 25%; (25% это 4 слайда , 50% = 2 , 33% = 3, и тд)
  // 	padding: 0 14px;
  // } для правильной работы счетчика шагов нужно прописать ключ для каждого изменения кол-ва слайдов и указать разрешение при котором кол-во видимых слайдов меняется(медиа запросы в css)


  const media = {
    1: window.matchMedia('(max-width: 1024px)'),
    2: window.matchMedia('(min-width: 1025px)')
  };

  // Можно создать много слайдеров, для этого добавляем container-slider с его дочерними элементами в html
  document.querySelectorAll('.wrapper-slider-and-btn-28').forEach((elem, index) => {
    //Объект с элементами слайдера, если кнопки ненужны не указываем их в объекте
    const $sliderAllElem = {
      btnNext: document.querySelectorAll('.next-btn-slider-28')[index],
      btnPrev: document.querySelectorAll('.prev-btn-slider-28')[index],
      slider: elem.querySelector('.container-slider-28__slider'),
      itemLength: elem.querySelectorAll('.container-slider-28__item').length,
      item: elem.querySelectorAll('.container-slider-28__item')[0],
    }


    const sliderObj = new Slider(media);
    sliderObj.initSlider($sliderAllElem);//инициализация слайдера
    sliderObj.initDragDrop('desktop');//инициализация drag'n drop не обязательна, если для desktop ненужно, то вызываем метод без аргумента
  });



}
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

});


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
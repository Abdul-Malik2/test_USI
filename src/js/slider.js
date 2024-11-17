//П Е Р Е М Е Н Н Ы Е:
const allSlides = document.querySelectorAll(".slider__box");
const sliderBoxWrapper = document.querySelector(".slider__box-wrapper");

const buttonBack = document.querySelector("._icon-back");
const buttonNext = document.querySelector("._icon-next");

//контейнер слайдера
const oneSlid = document.querySelector(".slider__box");

// //ширина контейнера:
// const slideWidth = window.getComputedStyle(oneSlid).width; // Получаем ширину через getComputedStyle
// const slideWidthNumber = parseFloat(slideWidth); // Преобразуем в число
// //marginRight контейнера:
// const marginRight = window.getComputedStyle(oneSlid).marginRight; // Получаем ширину через getComputedStyle
// const marginRightNumber = parseFloat(marginRight);
// //ширина контейнера с margin
// const slideWidthMarginRigh = slideWidthNumber + marginRightNumber;

let currSlide = 0;
let slideStep = 0;
let slideWidthMarginRigh = 0; // Инициализация переменной

let start = document.querySelector(".slider__tools_count-start");

// Функция для обновления ширины слайдов и отступов
function updateSlideDimensions() {
    const slideWidth = window.getComputedStyle(oneSlid).width; // Получаем ширину через getComputedStyle
    const slideWidthNumber = parseFloat(slideWidth); // Преобразуем в число

    const marginRight = window.getComputedStyle(oneSlid).marginRight; // Получаем ширину через getComputedStyle
    const marginRightNumber = parseFloat(marginRight); // Преобразуем в число

    // Обновляем ширину слайдов с учетом отступов
    slideWidthMarginRigh = slideWidthNumber + marginRightNumber;

    // Обновляем смещение текущего слайда
    slideStep = currSlide * slideWidthMarginRigh;

    // Обновляем позицию слайдера
    sliderBoxWrapper.style.transform = `translateX(${-slideStep}px)`;
}

// Вызываем функцию при загрузке страницы
updateSlideDimensions();

// Добавляем обработчик события resize
window.addEventListener("resize", updateSlideDimensions);

// Остальная часть вашего кода...

///////////////////
// Ф У Н К Ц И И:

//функция перекрашивающая контейнер
function setCurrentSlide(currSlide) {
    // Удаляем класс 'curr' у всех слайдов
    const allSlides = document.querySelectorAll(".slider__box");
    allSlides.forEach((slide) => {
        slide.classList.remove("parent-mask");
        for (let child of slide.children) {
            child.classList.remove("child-mask");
        }
    });

    // Находим слайд с id равным currSlide и добавляем ему класс 'curr'
    const currentSlide = document.getElementById(currSlide);
    if (currentSlide) {
        currentSlide.classList.add("parent-mask");
        const children = currentSlide.children;
        for (let child of children) {
            child.classList.add("child-mask");
        }
    }
}

setCurrentSlide(currSlide);

//С Ч Ё Т Ч И К:

// Функция для увеличения счетчика
function incrementCounter() {
    // Преобразуем текущее значение в число, увеличиваем на 1 и форматируем
    let currentValue = parseInt(start.innerHTML, 10);
    currentValue++; // Увеличиваем на 1

    // Форматируем с ведущим нулем
    start.innerHTML = currentValue.toString().padStart(2, "0");
}

function decreaseCounter() {
    // Преобразуем текущее значение в число, увеличиваем на 1 и форматируем
    let currentValue = parseInt(start.innerHTML, 10);
    currentValue--; // Увеличиваем на 1

    // Форматируем с ведущим нулем
    start.innerHTML = currentValue.toString().padStart(2, "0");
}

// С Л А Й Д Е Р:
//(desktop)
//кнопка вперёд
buttonNext.addEventListener("click", function () {
    // Ограничиваем количество слайдов
    if (currSlide <= allSlides.length - 2) {
        // currSlide = allSlides.length - 1; // или 0, если хотите зациклить

        currSlide++;
        //start.innerHTML++;
        incrementCounter();
        // Рассчитываем смещение для текущего слайда
        slideStep += slideWidthMarginRigh;

        // Применяем трансформацию один раз
        sliderBoxWrapper.style.transform = `translateX(${-slideStep}px)`;
    } else {
        currSlide = 0;
        slideStep = 0;
        start.innerHTML = "01";
        sliderBoxWrapper.style.transform = `translateX(${slideStep}px)`;
    }

    setCurrentSlide(currSlide);
});

//кнопка назад
buttonBack.addEventListener("click", function () {
    // Ограничиваем количество слайдов, если нужно
    if (currSlide > 0) {
        currSlide--;

        // Рассчитываем смещение для текущего слайда
        slideStep -= slideWidthMarginRigh;
        decreaseCounter();
        // Применяем трансформацию один раз
        sliderBoxWrapper.style.transform = `translateX(${-slideStep}px)`;
    } else {
        currSlide = allSlides.length - 1;
        slideStep = currSlide * slideWidthMarginRigh;
        start.innerHTML = "06";
        sliderBoxWrapper.style.transform = `translateX(${-slideStep}px)`;
    }
    setCurrentSlide(currSlide);
});

//////////////
//(mobile)

// Получаем все элементы с классом .slider__tools_button-circle
const circles = document.querySelectorAll(".slider__tools_button-circle");

// Переменная для хранения последней нажатой кнопки
let lastClickedCircle = null;

// Добавляем обработчик события на каждый элемент
circles.forEach((circle) => {
    // Устанавливаем начальный цвет
    circle.style.backgroundColor = "#D1CDDA";

    circle.addEventListener("click", () => {
        // Если есть ранее нажатая кнопка, возвращаем её цвет
        if (lastClickedCircle) {
            lastClickedCircle.style.backgroundColor = "#D1CDDA";
        }

        // Меняем цвет нажатой кнопки на черный
        circle.style.backgroundColor = "black";

        // Получаем значение атрибута data-circle
        const dataCurrent = circle.getAttribute("data-circle");
        const dataCurrentNumber = Number(dataCurrent);
        const mobielStep = slideWidthMarginRigh * (dataCurrentNumber - 1);

        // передвигаем бокс
        sliderBoxWrapper.style.transform = `translateX(${-mobielStep}px)`;

        // Обновляем последнюю нажатую кнопку
        lastClickedCircle = circle;

        //Перекрашиваем бокс
        currSlide = setCurrentSlide(dataCurrentNumber - 1);

        //СЧЁТЧИК
        // Преобразуем текущее значение в число, увеличиваем на 1 и форматируем
        let currentValue = parseInt(start.innerHTML, 10);
        currentValue = dataCurrentNumber; // Увеличиваем на 1

        // Форматируем с ведущим нулем
        start.innerHTML = currentValue.toString().padStart(2, "0");
    });
});
// console.log("mobielStep:", mobielStep);
// console.log("slideWidthNumber:", slideWidthNumber);
// console.log("marginRightNumber:", marginRightNumber);
// console.log("slideWidthMarginRigh:", slideWidthMarginRigh);

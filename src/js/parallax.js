// document.addEventListener("DOMContentLoaded", function() {
//     // Ваш код здесь
// });

const leftItem = document.querySelector(".section-parallax__decor-left");
const centerItem = document.querySelector(".section-parallax__decor-center");
const rightItem = document.querySelector(".section-parallax__decor-right");
const titleItem = document.querySelector(".section-parallax__title");
const decorItem = document.querySelector(".decor-item");

const sectionParallax = document.querySelector(".section-parallax");
const parallax = document.querySelector(".parallax");
const textBox = document.querySelector(".section-parallax__title-box");

const options = {
    root: null, // Используем viewport как корень
    threshold: 0.3, // Срабатывает, когда 10% элемента видно
};

// function callback(entries, observer) {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             leftItem.style.animationName = "departure-left-right";
//             centerItem.style.animationName = "departure-circle";
//             rightItem.style.animationName = "departure-left-right";
//             titleItem.style.animationName = "departure-title";
//             sectionParallax.style.animationName = "departure-title";
//             observer.unobserve(sectionParallax); // Останавливаем наблюдение после срабатывания
//         }
//     });
// }

function callback(entries, observer) {
    if (entries[0].isIntersecting) {
        leftItem.style.animationName = "departure-left-right";
        centerItem.style.animationName = "departure-circle";
        rightItem.style.animationName = "departure-left-right";
        titleItem.style.animationName = "departure-title";
        sectionParallax.style.animationName = "departure-title";
        parallax.style.animationName = "departure-title";

        observer.unobserve(sectionParallax); // Останавливаем наблюдение после срабатывания
    }
}

const observer = new IntersectionObserver(callback, options);
observer.observe(sectionParallax);

//P A R A L L A X

// document.onmousemove = (e) => {
//     let x = e.clientX / window.innerWidth;
//     let y = e.clientY / window.innerWidth;

//     console.log("x =", x);
//     console.log("y =", y);

//     // sectionParallax.style.transform = `translate(-${x * 50}px, -${y * 50}px)`;
//     sectionParallax.style.transform = `translate(-${x * 5}%, -${y * 5}%)`;
//     // textBox.style.transform = `translate(${x * 5}%, ${y * 5}%)`;

//     // sectionParallax.style.transform = `scale(${x * 100}%)`;

//     // sectionParallax.style.transform =
//     //     'translate(-" + x * 50 + "px, -" + y * 50 + "px)';
// };

parallax.addEventListener("mousemove", (e) => {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerWidth;

    sectionParallax.style.transform = `translate(-${x * 5}%, -${y * 10}%)`;

    titleItem.style.transform = `skew(${(x - 0.5) * 50}deg, ${
        (y - 0.5) * 10
    }deg)`;
    // decorItem.style.transform = `skew(${(x - 0.5) * 20}deg, ${
    //     (y - 0.5) * 20
    // }deg)`;
    ////////////////////////////
});

// window.addEventListener("scroll", (e) => {
//     const scrollPosition = window.scrollY;
//     const speedFactor = 0.7; // Чем меньше значение, тем медленнее будет движение
//     // Изменяем translateY для создания эффекта замедления
//     const translateYValue = scrollPosition * speedFactor;
//     console.log("translateYValue = ", translateYValue);

//     let val = translateYValue;
//     console.log("val =", val);
//     textBox.style.transform = `translate(-50%, ${val - 1000}%) translateZ(0)`;
// });

window.addEventListener("scroll", (e) => {
    const scrollPosition = window.scrollY;

    // Получаем относительное положение прокрутки
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollRatio = scrollPosition / maxScroll;

    // Определяем значения для трансформации
    const x = scrollRatio; // Отношение прокрутки по горизонтали
    const y = scrollRatio; // Отношение прокрутки по вертикали

    // Применяем трансформации
    sectionParallax.style.transform = `translate(-${x * 5}%, -${y * 15}%)`;
    titleItem.style.transform = `skew(${(x - 0.5) * 50}deg, ${
        (y - 0.5) * 10
    }deg)`;
});

const nav = document.querySelector(".navigation");

//nav.style.background = "red";

// nav.addEventListener("mouseover", function (e) {
//     if (e.target.classList.contains("nav_link")) {
//         const link = e.target;
//         const siblink = link
//             .closest(".navigation")
//             .querySelectorAll(".nav_link");

//         siblink.array.forEach((element) => {
//             if (element !== link) {
//                 element.style.backgroundColor = "red";
//             }
//         });
//     }
// });

const header = document.querySelector(".header");

// старый способ:

// const cord = header.getBoundingClientRect();
// window.addEventListener("scroll", function () {
//     if (window.scrollY > cord.top) {
//         nav.classList.add("sticky");
//     } else {
//         nav.classList.remove("sticky");
//     }
// });

// новый способ:
const option = {
    root: null,
    threshold: 0.5,
    rootMargin: "-10px",
};

function callBack(entries, observer) {
    console.log(entries);
    console.log(observer);
    if (!entries[0].isIntersecting) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
}

const observer = new IntersectionObserver(callBack, option);

observer.observe(header);

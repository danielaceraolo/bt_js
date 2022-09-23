/*----------------CONST Y LET -----------------*/

const slideImage = document.querySelectorAll(".slide-image");
const slidesContainer = document.querySelector(".slides-container");
const navigationDots = document.querySelector(".navigation-dots");

let numberOfImages = slideImage.length;
let slideWidth = slideImage[0].clientWidth;
let currentSlide = 0;

/*----------------AGREGO FUNCION DE SLIDER-----------------*/

function start() {
    slideImage.forEach((img, i) => {
        img.style.left = i * 100 + "%";
    });

    slideImage[0].classList.add("active");

    createNavigationDots();
}

start();

/*-------------AGREGO PUNTOS DE NAVEGACION--------------*/


function createNavigationDots() {
    for (let i = 0; i < numberOfImages; i++) {
        const dot = document.createElement("div");
        dot.classList.add("single-dot");
        navigationDots.appendChild(dot);

        dot.addEventListener("click", () => {
            goToSlide(i);
        });
    }

    navigationDots.children[0].classList.add("active");
}

/*----------------QUE EL SLIDE FUNCIONE-----------------*/

function goToSlide(slideNumber) {
    slidesContainer.style.transform =
        "translateX(-" + slideWidth * slideNumber + "px)";

    currentSlide = slideNumber;

    setActiveClass();
}

/*----------------CAMBIO CLASE 'ACTIVE'-----------------*/

function setActiveClass() {
    let currentActive = document.querySelector(".slide-image.active");

    currentActive.classList.remove("active");

    slideImage[currentSlide].classList.add("active");

    // CLASE 'ACTIVE' EN LOS NAVIGATION DOT

    let currentDot = document.querySelector(".single-dot.active");
    currentDot.classList.remove("active");
    navigationDots.children[currentSlide].classList.add("active");
}
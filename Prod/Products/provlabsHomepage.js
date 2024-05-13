import "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";

    const animationContainer = document.getElementById('animationContainer');
    const dotlottiePlayer = document.createElement('dotlottie-player');
    dotlottiePlayer.setAttribute('src', 'https://lottie.host/35e6d049-0b75-43b0-a5b8-d14575482297/KUV0BnEVdE.lottie');
    dotlottiePlayer.setAttribute('background', 'transparent');
    dotlottiePlayer.setAttribute('speed', '1');
    if (window.innerWidth < 768) {
        dotlottiePlayer.setAttribute('style', 'width: 240px; height: 240px;');
    }

    if (window.innerWidth > 768) {
        dotlottiePlayer.setAttribute('style', 'width: 100%; height: auto;');
    }    dotlottiePlayer.setAttribute('loop', 'true');
    dotlottiePlayer.setAttribute('autoplay', 'true');
    animationContainer.appendChild(dotlottiePlayer);

// Adjust "people" module for homepage

const divElement = document.querySelector('.grid.grid-cols-2.gap-4.px-4.py-10');

// Check if the div element is found
if (divElement) {
    // Replace "md:grid-cols-5" with "md:grid-cols-4" in the classList
    divElement.classList.replace('md:grid-cols-5', 'md:grid-cols-4');
    // Add background image only if viewport width is above 768px
    if (window.innerWidth > 768) {
        divElement.style.backgroundImage = "url('https://ucarecdn.com/eed14b1f-a094-4e53-82a2-624e8e9b8945/SolutionsHomeBG.png')";
        // Optionally, you can specify additional background properties such as background size, repeat, position, etc.
        divElement.style.backgroundSize = "cover";
        divElement.style.backgroundRepeat = "no-repeat";
        divElement.style.backgroundPosition = "center";
    }
} else {
    console.error('Div element not found');
}

// remove background of people cards
const divElements = document.querySelectorAll('.flex.w-full.flex-col.items-center.justify-start.justify-self-center');

// Loop through each div element
divElements.forEach(divElement => {
    // Replace "bg-white" with "bg-transparent" in the classList
    divElement.classList.replace('bg-white', 'bg-transparent');
})

// resizes animation camera ratio and renderer when window is resized
function onWindowResize() {

    if (window.innerWidth < 768) {
        dotlottiePlayer.setAttribute('style', 'width: 240px; height: 240px;');
        divElement.style.backgroundImage = "none";
    }

    if (window.innerWidth > 768) {
        dotlottiePlayer.setAttribute('style', 'width: 100%; height: auto;');
        divElement.style.backgroundImage = "url('https://ucarecdn.com/eed14b1f-a094-4e53-82a2-624e8e9b8945/SolutionsHomeBG.png')";

    }
}
window.addEventListener('resize', onWindowResize);

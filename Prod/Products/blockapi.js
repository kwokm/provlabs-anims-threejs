import "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";

    const animationContainer = document.getElementById('animationContainer');
    const dotlottiePlayer = document.createElement('dotlottie-player');
    dotlottiePlayer.setAttribute('src', 'https://lottie.host/7e65d210-3a64-406c-9926-5ec0eb4cee2f/u8cXn9FBnA.lottie');
    dotlottiePlayer.setAttribute('background', 'transparent');
    dotlottiePlayer.setAttribute('speed', '1');
    if (window.innerWidth < 768) {
        dotlottiePlayer.setAttribute('style', 'width: 240px; height: 240px;');
    }

    if (window.innerWidth > 768) {
        dotlottiePlayer.setAttribute('style', 'width: 100%; height: auto;');
    }    dotlottiePlayer.setAttribute('loop', 'false');
    dotlottiePlayer.setAttribute('autoplay', 'true');
    animationContainer.appendChild(dotlottiePlayer);

// resizes animation camera ratio and renderer when window is resized
function onWindowResize() {

    if (window.innerWidth < 768) {
        dotlottiePlayer.setAttribute('style', 'width: 240px; height: 240px;');
    }

    if (window.innerWidth > 768) {
        dotlottiePlayer.setAttribute('style', 'width: 100%; height: auto;');
    }
}
window.addEventListener('resize', onWindowResize);

// Create a <style> element
const styleElement = document.createElement('style');

// Define your CSS rules
const cssText = `
    .animation > svg { 
        transform: none !important; 
    } 
`;

// Set the CSS text of the style element
styleElement.textContent = cssText;

// Append the style element to the <head> of the document
document.head.appendChild(styleElement);
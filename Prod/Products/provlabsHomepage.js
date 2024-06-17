const animationContainer = document.getElementById('animationContainer');

// Create the video element
const video = document.createElement('video');
animationContainer.style.overflow = "hidden";
animationContainer.style.borderRadius = "12px";
video.loop = true;
video.autoplay = true;
video.muted = true;
video.playsInline = true;

// Create the source element
const source = document.createElement('source');
source.src = "https://ucarecdn.com/4e46a549-b27a-4b5b-8cdb-749472a8a83f/ProvLabsLogoWhite.mp4";
source.type = "video/mp4";
video.appendChild(source);

if (window.innerWidth < 768) {
    video.setAttribute('style', 'width: 240px; height: 240px; mix-blend-mode: darken;');
}

if (window.innerWidth > 768) {
    video.setAttribute('style', 'width: 100%; height: auto; mix-blend-mode: darken;');
}
animationContainer.appendChild(video);

// Adjust "people" module for homepage

const divElement = document.querySelector('.grid.grid-cols-2.gap-4.px-4.py-10');

// Check if the div element is found
if (divElement) {
    // Replace "md:grid-cols-5" with "md:grid-cols-4" in the classList
    divElement.classList.replace('md:grid-cols-5', 'md:grid-cols-4');
divElement.classList.replace('py-10', 'pt-10');
    // Add background image only if viewport width is above 768px
    if (window.innerWidth > 768) {
        divElement.style.backgroundImage = "url('https://www.datocms-assets.com/114273/1715560307-solhomebg.png')";
        // Optionally, you can specify additional background properties such as background size, repeat, position, etc.
        divElement.style.backgroundSize = "cover";
        divElement.style.backgroundRepeat = "no-repeat";
        divElement.style.backgroundPosition = "top";
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
        video.setAttribute('style', 'width: 240px; height: 240px; mix-blend-mode: darken;');
        divElement.style.backgroundImage = "none";
    }

    if (window.innerWidth > 768) {
        video.setAttribute('style', 'width: 100%; height: auto; mix-blend-mode: darken;');
        divElement.style.backgroundImage = "url('https://www.datocms-assets.com/114273/1715560307-solhomebg.png')";
        divElement.style.backgroundSize = "cover";
        divElement.style.backgroundRepeat = "no-repeat";
        divElement.style.backgroundPosition = "top";
    }
}
window.addEventListener('resize', onWindowResize);

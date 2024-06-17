import "https://unpkg.com/@splinetool/viewer@1.4.8/build/spline-viewer.js";


// Remove spline watermark
window.addEventListener('load', function() {
    var splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
        var shadowRoot = splineViewer.shadowRoot;
        if (shadowRoot) {
            var logoElement = shadowRoot.querySelector('#logo');
            if (logoElement) {
                logoElement.remove();
            }
        }
    }
});

    const animationContainer = document.getElementById('animationContainer');
    const parent = document.querySelector('.max-h-56.max-w-56.justify-self-end');
    parent.style.height = "100%";
    animationContainer.style.width = "100%";
    animationContainer.style.height = "100%";
    const splineViewer = document.createElement('spline-viewer');
    splineViewer.setAttribute('url', 'https://prod.spline.design/314k6eP6PaxVHttm/scene.splinecode');
    if (window.innerWidth < 768) {
        splineViewer.setAttribute('style', 'width: 240px; height: 240px;');
    }

    if (window.innerWidth > 768) {
        splineViewer.setAttribute('style', 'width: 100%; height: 100%;');
    }
    animationContainer.innerHTML="";
    animationContainer.appendChild(splineViewer);

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
        dotlottiePlayer.setAttribute('style', 'width: 240px; height: 240px;');
        divElement.style.backgroundImage = "none";
    }

    if (window.innerWidth > 768) {
        dotlottiePlayer.setAttribute('style', 'width: 100%; height: auto;');
        divElement.style.backgroundImage = "url('https://www.datocms-assets.com/114273/1715560307-solhomebg.png')";

    }
}
window.addEventListener('resize', onWindowResize);

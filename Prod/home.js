// Load Rive script and then execute necessary code for animation
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@rive-app/canvas@2.23.4/rive.min.js';
script.onload = function () {
    // Create canvas and set size based on viewport width - key is using style to lock size
    const canvas = document.createElement('canvas');
    if (window.innerWidth < 768) {
        canvas.style.width = '240px';
        canvas.style.height = '240px';
    } else {
        canvas.style.width = ((Math.min(((window.innerWidth - 320) * .4), 448)).toString().concat("px"));
        canvas.style.height = Math.min((canvas.width * 1.15), 448).toString().concat("px");
    }

    // Get animation container
    const animationContainer = document.getElementById('animationContainer');

    // Initialize the Rive animation
    const anim = new rive.Rive({
        src: "https://ucarecdn.com/75ff21cb-587a-448e-8ec8-5cd6fcd15ae6/pvllogopinwheel.riv",
        canvas: canvas,
        artboard: 'Pinwheel',
        autoplay: true,
        fit: rive.Fit.contain,
    });

    // Create function to adjust size of canvas and animation and add it to a resize event listener
    const adjustSize = () => {
        if (window.innerWidth < 768) {
            canvas.style.width = '240px';
            canvas.style.height = '240px';
            anim.resizeDrawingSurfaceToCanvas();
        } else {
            canvas.style.width = ((Math.min(((window.innerWidth - 320) * .4), 448)).toString().concat("px"));
            canvas.style.height = Math.min((canvas.width * 1.15), 448).toString().concat("px");
            anim.resizeDrawingSurfaceToCanvas();
        }
    };
    window.addEventListener('resize', adjustSize);

    // Append canvas to animation container and adjust size
    animationContainer.appendChild(canvas);
    adjustSize();
};

// Append the script tag to load the Rive library
document.head.appendChild(script);

// Adjust "people" module for homepage
const divElement = document.querySelector('.grid.grid-cols-2.gap-4.px-4.py-10'); // Grab the proper div element
if (divElement) {
    // Replace "md:grid-cols-5" with "md:grid-cols-4" in the classList
    divElement.classList.replace('md:grid-cols-5', 'md:grid-cols-4');
    divElement.classList.replace('py-10', 'pt-10');
    // Add and style background image only if viewport width is above 768px
    const bgResize = () => {
        if (window.innerWidth > 768) {
            divElement.style.backgroundImage = "url('https://www.datocms-assets.com/114273/1715560307-solhomebg.png')";
            divElement.style.backgroundSize = "cover";
            divElement.style.backgroundRepeat = "no-repeat";
            divElement.style.backgroundPosition = "top";
        }
        else {
            divElement.style.backgroundImage = "none";
        }
    };
    bgResize();
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
// Add resize event listener to adjust background image
window.addEventListener('resize', bgResize);
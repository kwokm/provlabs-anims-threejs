// Constants
const CONFIG = {
    BREAKPOINT: 768,
    RIVE_URL: 'https://ucarecdn.com/75ff21cb-587a-448e-8ec8-5cd6fcd15ae6/pvllogopinwheel.riv',
    BG_IMAGE_URL: 'https://www.datocms-assets.com/114273/1715560307-solhomebg.png',
    RIVE_SCRIPT: 'https://cdn.jsdelivr.net/npm/@rive-app/canvas@2.23.4/rive.min.js'
};

// Debounce function for resize events
const debounce = (fn, delay = 250) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

// Initialize Rive animation
const initRiveAnimation = () => {
    const animationContainer = document.getElementById('animationContainer');
    if (!animationContainer) return;

    const canvas = document.createElement('canvas');
    const anim = new rive.Rive({
        src: CONFIG.RIVE_URL,
        canvas,
        artboard: 'Pinwheel',
        autoplay: true,
        fit: rive.Fit.contain,
    });

    // Memoized size calculation
    const calculateCanvasSize = () => {
        const { innerWidth } = window;
        return innerWidth < CONFIG.BREAKPOINT 
            ? { width: '240px', height: '240px' }
            : {
                width: `${Math.min(((innerWidth - 320) * 0.4), 448)}px`,
                height: `${Math.min(((innerWidth - 320) * 0.4 * 1.15), 448)}px`
            };
    };

    const adjustSize = debounce(() => {
        Object.assign(canvas.style, calculateCanvasSize());
        anim.resizeDrawingSurfaceToCanvas();
    });

    window.addEventListener('resize', adjustSize);
    animationContainer.appendChild(canvas);
    adjustSize();
};

// Handle people module adjustments
const initPeopleModule = () => {
    const gridDiv = document.querySelector('.grid.grid-cols-2.gap-4.px-4.py-10');
    if (!gridDiv) return console.error('Grid div element not found');

    // Apply initial class changes
    gridDiv.classList.replace('md:grid-cols-5', 'md:grid-cols-4');
    gridDiv.classList.replace('py-10', 'pt-10');

    // Create background styles object
    const bgStyles = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top'
    };

    const bgResize = debounce(() => {
        const isDesktop = window.innerWidth > CONFIG.BREAKPOINT;
        gridDiv.style.backgroundImage = isDesktop ? `url('${CONFIG.BG_IMAGE_URL}')` : 'none';
        Object.assign(gridDiv.style, isDesktop ? bgStyles : {});
    });

    window.addEventListener('resize', bgResize);
    bgResize();

    // Single DOM query for performance
    const cards = document.querySelectorAll('.flex.w-full.flex-col.items-center.justify-start.justify-self-center');
    cards.forEach(div => div.classList.replace('bg-white', 'bg-transparent'));
};

// Initialize everything
(() => {
    const script = document.createElement('script');
    script.src = CONFIG.RIVE_SCRIPT;
    script.onload = () => {
        initRiveAnimation();
        initPeopleModule();
    };
    document.head.appendChild(script);
})();
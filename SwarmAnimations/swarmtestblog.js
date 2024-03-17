import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.162.0/three.module.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 2.5/1, 0.01, 100);
// setting camera position
camera.position.set(0, .25, -.05);
camera.rotation.x = -Math.PI / 6; // Rotate the camera to achieve a 30 degree downward looking angle

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerWidth/2.5);
const animationContainer = document.getElementById('animationContainer');
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.bottom = '0';
renderer.domElement.style.left = '50%';
renderer.domElement.style.transform = 'translateX(-50%)';
renderer.domElement.style.zIndex = '-1';
animationContainer.appendChild(renderer.domElement); // Append renderer to the animation container

const torusGeometry = new THREE.TorusGeometry(.5, 0.15, 3, 64); // Adjust torus size here
torusGeometry.rotateX((Math.PI / 2)); // Rotate 90 degrees on the X-axis to make it flat on the z-axis

const torusMeshes = [];  //contains the toruses which will make up the end animation

let i = Math.round((window.innerWidth - 375) / (3440 - 375) * (108 - 32) + 32); // set number of toruses depending on screen size (scales up)
let minPointSize = (window.innerWidth - 375) / (1920 - 375) * (1) + 1.6; // set point size based on screen size (scales up)
let maxPointSize = (window.innerWidth - 375) / (1920 - 375) * (1.2) + 2;

for (let j = 0; j < i; j++) {
    const colors = ['#FAC138', '#F38447', '#17A6DA', '#F09999'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Randomly select a color from the array
    const pointSize = Math.random() * (maxPointSize - minPointSize) + minPointSize;
    const pointCloudMaterial = new THREE.PointsMaterial({
        size: pointSize,
        color: new THREE.Color(randomColor),
        sizeAttenuation: false,
    });


    const torusMesh = new THREE.Points(torusGeometry, pointCloudMaterial);
    const angle = Math.random() * Math.PI * 1;
    const radius = Math.random() * 0.05 + 0.05; // Adjust the radius for containment
    torusMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, Math.random() * 0.5 - 0.2);
    torusMeshes.push(torusMesh);
    scene.add(torusMesh);
}

    const presetRotations = Array.from({ length: torusMeshes.length }, () => Math.random() * 0.003 - 0.0025);

    torusMeshes.forEach((torusMesh, index) => {
        torusMesh.rotation.y = presetRotations[index]; // Set random rotation on the y-axis
        const angle = Math.atan2(torusMesh.position.y, torusMesh.position.x);
        const radius = Math.sqrt(torusMesh.position.x ** 2 + torusMesh.position.y ** 2);
        torusMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, torusMesh.position.z);
    });

function animate() {
    requestAnimationFrame(animate);

    torusMeshes.forEach((torusMesh, index) => {
        torusMesh.rotation.y += presetRotations[index]*Math.random()*1; // Set random rotation on the y-axis
        const angle = Math.atan2(torusMesh.position.y, torusMesh.position.x);
        const radius = Math.sqrt(torusMesh.position.x ** 2 + torusMesh.position.y ** 2);
        torusMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, torusMesh.position.z);
    });

    renderer.render(scene, camera);
}


// resizes animation camera ratio and renderer when window is resized
function onWindowResize() {
    camera.aspect = 2.5/1;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerWidth/2.5);
}
window.addEventListener('resize', onWindowResize);

animate();
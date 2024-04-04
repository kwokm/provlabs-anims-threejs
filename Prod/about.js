import * as THREE from "https://threejs.org/build/three.module.js";
import { ImprovedNoise } from 'https://threejs.org/examples/jsm/math/ImprovedNoise.js';

const perlin = new ImprovedNoise();
const noiseStrength = 11.5; // Adjust the strength of the Perlin noise effect
const animationSpeed = 0.35; // Adjust the speed of the animation

let scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 6/1, 0.01, 190);

camera.position.set(0, 10, 0); // Adjust the height of the camera
camera.rotation.x = /* degrees */ -23 * Math.PI / 180;

let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(new THREE.Color(0xffffff), 0); // Set the clear color to white with 0 opacity
renderer.setSize(window.innerWidth, window.innerWidth/6);
const animationContainer = document.getElementById('animationContainer');
animationContainer.appendChild(renderer.domElement); // Append renderer to the animation container

// Replace TorusGeometry with PlaneGeometry
const width = 600;
const height = 600;
const widthSegments = 64 + 64*(Math.log(window.innerWidth/375)/Math.log(5));
const heightSegments = 64 + 64*(Math.log(window.innerWidth/375)/Math.log(5));
console.log(widthSegments);
const g = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
g.rotateX(Math.PI * -0.5);
g.rotateY(Math.PI * 3.7);

/* const pointCloudMaterial = new THREE.PointsMaterial({
    size: pointSize,
    color: colors[Math.floor(Math.random() * colors.length)],
    sizeAttenuation: false,
}); */

console.log( 1.1*(Math.log(window.innerWidth / 375) / Math.log(1280 / 375)) )
const pointCloudMaterial = new THREE.ShaderMaterial({
    uniforms: {
        color1: { value: new THREE.Color('hsl(218, 60%, 60%)') },
        color2: { value: new THREE.Color('hsl(218, 60%, 35%)') },
        pointSize: { value: 1 + 1.1*(Math.log(window.innerWidth / 375) / Math.log(1280 / 375)) },
    },
    vertexShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float pointSize;
        varying vec3 vColor;
        void main() {
            vColor = mix(color2, color1, (position.y+6.0) * .15 + ((position.z) * .003)); // Adjust 100.0 based on your scene
            gl_PointSize = pointSize + position.y * 0.15 + (position.z/190.0) * 0.3; // Adjust the point size based on y value
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `,
    transparent: true,
});

let o = new THREE.Points(g, pointCloudMaterial);
scene.add(o);

let pos = g.attributes.position;
let uv = g.attributes.uv;
let vUv = new THREE.Vector2();

let clock = new THREE.Clock();

// Create an element to display the FPS
/*
const fpsCounter = document.createElement('div');
fpsCounter.style.position = 'absolute';
fpsCounter.style.bottom = '10px';
fpsCounter.style.left = '10px';
fpsCounter.style.color = 'black';
fpsCounter.style.fontFamily = 'Arial';
fpsCounter.style.fontSize = '14px';
fpsCounter.style.zIndex = '100';
document.body.appendChild(fpsCounter);

let frameCount = 0;
let prevTime = Date.now();
*/

renderer.setAnimationLoop(() => {
    
    let t = clock.getElapsedTime() * animationSpeed; // Adjust the speed of the animation
    for (let i = 0; i < pos.count; i++) {
        vUv.fromBufferAttribute(uv, i).multiplyScalar(2.5);
        let y = perlin.noise(vUv.x*4 /*set frequency */, vUv.y*4 + t, t * 0.1) * noiseStrength; // Adjust the Perlin noise strength
        pos.setY(i, y);
    }
    g.rotateY(-.0004);
    pos.needsUpdate = true;


    // FPS calculation and display
    /*
    const currentTime = Date.now();
    frameCount++;
    
    if (currentTime >= prevTime + 1000) { // Update every second
        fpsCounter.textContent = `FPS: ${frameCount}`;
        frameCount = 0;
        prevTime = currentTime;
    }
    */

    renderer.render(scene, camera);
});


// resizes animation camera ratio and renderer when window is resized
function onWindowResize() {
    camera.aspect = 6/1;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerWidth/6);

        // Update necessary values
        pointCloudMaterial.uniforms.pointSize.value = 1 + 1.1*(Math.log(window.innerWidth / 375) / Math.log(1280 / 375));
}
window.addEventListener('resize', onWindowResize);
import * as THREE from "https://threejs.org/build/three.module.js";
import { ImprovedNoise } from 'https://threejs.org/examples/jsm/math/ImprovedNoise.js';

const perlin = new ImprovedNoise();
const noiseStrength = 200; // Adjust the strength of the Perlin noise effect
const animationSpeed = .1; // Adjust the speed of the animation

let scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 2/1, 0.01, 1000);

camera.position.set(0, -5, 0); // Adjust the height of the camera
camera.lookAt(0, -5,-500);

let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(new THREE.Color(0xffffff), 0); // Set the clear color to white with 0 opacity
renderer.setSize(document.getElementById('2animationContainer').clientWidth, document.getElementById('2animationContainer').clientWidth/2);
const animationContainer = document.getElementById('2animationContainer');
animationContainer.appendChild(renderer.domElement); // Append renderer to the animation container

// Replace TorusGeometry with PlaneGeometry
const width = 1200;
const height = 800;
const widthSegments = 64 + 64*(Math.log(window.innerWidth/375)/Math.log(5));
const heightSegments = 64 + 64*(Math.log(window.innerWidth/375)/Math.log(5));
console.log(widthSegments);
const g = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
g.rotateX(Math.PI * -0.5);
g.rotateY(/* degrees */ 15 * Math.PI / 180);

const pointCloudMaterial = new THREE.ShaderMaterial({
    uniforms: {
        color1: { value: new THREE.Color('#FBC663') },
        color2: { value: new THREE.Color('#ED8762') },
        pointSize: { value: 1 + 1.1*(Math.log(window.innerWidth / 375) / Math.log(1280 / 375)) },
    },
    vertexShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float pointSize;
        varying vec3 vColor;
        void main() {
            vColor = mix(color2, color1, (position.y) * .02); // Adjust 100.0 based on your scene
            gl_PointSize = pointSize + position.y * 0.01 + (position.z/190.0) * 0.3; // Adjust the point size based on y value
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
o.position.set(0, -40, -700);
scene.add(o);

let pos = g.attributes.position;
let uv = g.attributes.uv;
let vUv = new THREE.Vector2();
let clock = new THREE.Clock();

function fractalNoise(x, y, z, t, octaves = 2, persistence = 1) {
    let total = 0;
    let frequency = 1.5;
    let amplitude = 1;
    let maxValue = 0;  // Used for normalizing result to 0.0 - 1.0
    for(let i = 0; i < octaves; i++) {
        total += perlin.noise(x * frequency + t, y * frequency + t, z * frequency + t) * amplitude;
        
        maxValue += amplitude;
        
        amplitude *= persistence;
        frequency *= 2;
    }
    
    return total/maxValue;
}

// let printy = 20;
renderer.setAnimationLoop(() => {
    let t = clock.getElapsedTime() * animationSpeed;

    for (let i = 0; i < pos.count; i++) {
        vUv.fromBufferAttribute(uv, i).multiplyScalar(2.5);
        // Adjust the parameters as needed for your use case
        let y = fractalNoise(-vUv.x + t, vUv.y, 0, -.8*t) * noiseStrength;
        pos.setY(i, y);
        
        // if (y>printy){printy=y;console.log(printy);}
    }
    // g.rotateY(-.0004);
    pos.needsUpdate = true;

    renderer.render(scene, camera);
});


// resizes animation camera ratio and renderer when window is resized
function onWindowResize() {
    camera.aspect = 2/1;
    camera.updateProjectionMatrix();
    if (window.innerWidth<991 && window.innerWidth>767) {
        renderer.setSize(window.innerWidth-128, (window.innerWidth-128)/2);
    }
    else if (window.innerWidth<767 && window.innerWidth>479) {
        renderer.setSize(window.innerWidth-88, (window.innerWidth-88)/2);
    }
    else if (window.innerWidth<479) {
        renderer.setSize(window.innerWidth-32, (window.innerWidth-32)/2);
    }
    else {
        renderer.setSize(document.getElementById('2animationContainer').clientWidth, document.getElementById('2animationContainer').clientWidth/2);
    }
    
}
window.addEventListener('resize', onWindowResize);
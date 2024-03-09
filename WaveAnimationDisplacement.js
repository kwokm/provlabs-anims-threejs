import * as THREE from "https://threejs.org/build/three.module.js";
import { ImprovedNoise } from 'https://threejs.org/examples/jsm/math/ImprovedNoise.js';

const perlin = new ImprovedNoise();
const noiseStrength = 3; // Adjust the strength of the Perlin noise effect
const animationSpeed = 0.3; // Adjust the speed of the animation

let scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 6/1, 0.01, 100);
camera.position.set(0, 4, 4);
camera.lookAt( 0, 2, 0);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerWidth/6);
document.body.appendChild(renderer.domElement);

// Replace TorusGeometry with PlaneGeometry
const width = 50;
const height = 50;
const widthSegments = 60;
const heightSegments = 30;
const g = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
g.rotateX(Math.PI * -0.5);
g.rotateY(Math.PI * .3)
// Load the displacement map texture
const displacementMap = new THREE.TextureLoader().load('https://t3.ftcdn.net/jpg/06/05/82/92/360_F_605829220_r31mIXpL8tWwwTmnd2g9QvovISqhFfeA.jpg');
let m = new THREE.MeshStandardMaterial({ wireframe: true, color: 0x000E25});
m.displacementMap = displacementMap;
m.displacementScale= 1;
let o = new THREE.Mesh(g, m);
scene.add(o);

let pos = g.attributes.position;
let uv = g.attributes.uv;
let vUv = new THREE.Vector2();

let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {

    renderer.render(scene, camera);
});

// resizes animation camera ratio and renderer when window is resized
function onWindowResize() {
    camera.aspect = 6/1;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerWidth/6);
}
window.addEventListener('resize', onWindowResize);
import * as THREE from "https://threejs.org/build/three.module.js";
import { ImprovedNoise } from 'https://threejs.org/examples/jsm/math/ImprovedNoise.js';

const perlin = new ImprovedNoise();
const noiseStrength = 7; // Adjust the strength of the Perlin noise effect
const animationSpeed = 0.2; // Adjust the speed of the animation

let scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1/1, 0.01, 100);
camera.position.set(0, 6, 0);
camera.lookAt(2, 3, 0);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const radius = 6;
const tubeRadius = 4;
const radialSegments = 50;
const tubularSegments = 50;

const g = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);
g.rotateX(Math.PI * -0.5);
g.rotateY(Math.PI * .2)
let m = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x000E25 });
let o = new THREE.Mesh(g, m);
scene.add(o);

let pos = g.attributes.position;
let uv = g.attributes.uv;
let vUv = new THREE.Vector2();

let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
    let t = clock.getElapsedTime() * animationSpeed; // Adjust the speed of the animation
    for (let i = 0; i < pos.count; i++) {
        vUv.fromBufferAttribute(uv, i).multiplyScalar(2.5);
        let y = perlin.noise(vUv.x, vUv.y + t, t * 0.1) * noiseStrength; // Adjust the Perlin noise strength
        pos.setY(i, y);
    }

        // Add rotation to the shape
        g.rotateY(.0004);
    pos.needsUpdate = true;
    renderer.render(scene, camera);
});
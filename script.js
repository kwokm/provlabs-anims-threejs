import * as THREE from './three.min.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable alpha channel
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a PointsMaterial for the particles
const pointCloudMaterial = new THREE.PointsMaterial({
  size: 2.2,
  color: 0x123D86,  // Set particle color
  sizeAttenuation: false,  // Disable size attenuation based on distance
});

// Create a PointsMaterial for the particles
const pointCloudMaterial2 = new THREE.PointsMaterial({
  size: 1.5,  // Adjust particle size
  color: 0x000E25,  // Set particle color
  sizeAttenuation: false,  // Disable size attenuation based on distance
});

// Create the torus geometry
const torusGeometry = new THREE.TorusGeometry(2.9, 1.5, 32, 16);
const torusGeometry2 = new THREE.TorusGeometry(3, 1.5, 64, 64);

torusGeometry.rotateX(Math.PI / 2);
torusGeometry2.rotateX(Math.PI / 2); // Rotate 90 degrees on the X-axis

// Create the torus mesh using PointsMaterial (no size property needed)
const torusMesh = new THREE.Points(torusGeometry, pointCloudMaterial);
const torusMesh2 = new THREE.Points(torusGeometry2, pointCloudMaterial2);


scene.add(torusMesh);
scene.add(torusMesh2);

// Update the camera aspect ratio based on window dimensions
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
camera.position.z = 5;
camera.position.y = 2;

function animate() {
  requestAnimationFrame(animate);

  // Rotate the torus for animation
  torusMesh.rotation.y += 0.001;  // Rotate the torus
  torusMesh2.rotation.y += 0.0007;  // Rotate the torus

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

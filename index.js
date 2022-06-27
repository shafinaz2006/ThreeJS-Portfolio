import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// which dom element to use
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#webgl'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(3, 1, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const material2 = new THREE.MeshStandardMaterial({color: 0xFF6300});
const torus2 = new THREE.Mesh(geometry, material2);
torus2.position.set(10, 10, 10);
scene.add(torus2);

const material3 = new THREE.MeshStandardMaterial({color: 0xE02000});
const torus3 = new THREE.Mesh(geometry, material3);
torus3.position.set(-15, -10, -5);
scene.add(torus3);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpeg');
scene.background = spaceTexture;

// Avatar

const butterFlyTexture = new THREE.TextureLoader().load('butterFly.jpeg');
const butterFly = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: butterFlyTexture }));
scene.add(butterFly);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpeg');
const normalTexture = new THREE.TextureLoader().load('normal.jpeg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture, // gives more texture
  })
);

scene.add(moon);

moon.position.z = -30;
moon.position.setX(20);

butterFly.position.z = -5;
butterFly.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top; // find the user's position
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  butterFly.rotation.y += 0.01;
  butterFly.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  torus2.rotation.x += 0.01;
  torus2.rotation.y += 0.01;
  torus2.rotation.z += 0.01;
  torus3.rotation.x += 0.005;
  torus3.rotation.y += 0.01;
  torus3.rotation.z += 0.01;
  moon.rotation.x += 0.005;

  controls.update();
  renderer.render(scene, camera);
}

animate();

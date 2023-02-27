import * as THREE from 'three';
import { Color, PerspectiveCamera, Vector3 } from 'three';

import { controlCamera } from './controls';
import './style.css';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
axesHelper.setColors('red', 'green', 'blue');

const geometry = new THREE.BoxGeometry(10, 10, 10);
geometry.translate(5, 5, 5);
const material = new THREE.MeshBasicMaterial({
  color: 0x0e8313,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 30;
camera.position.y = 15;

const gridHelper = new THREE.GridHelper(200, 20);
scene.add(gridHelper);

const crosshair = new THREE.Mesh(
  new THREE.SphereGeometry(0.005, 10, 10),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
scene.add(crosshair);

function animate() {
  requestAnimationFrame(animate);

  controlCamera(camera);

  lookingAt(camera);

  renderer.render(scene, camera);
}

animate();

/**
 * @param {PerspectiveCamera} camera
 */
function lookingAt(camera) {
  const directionVector = camera.getWorldDirection(new Vector3()).normalize();
  crosshair.position.x = camera.position.x + directionVector.x;
  crosshair.position.y = camera.position.y + directionVector.y;
  crosshair.position.z = camera.position.z + directionVector.z;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera({ x: 0, y: 0 }, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  for (let i = 0; i < intersects.length; i++) {
    /**
     * @type {Color} oldColor
     */
    const oldColor = intersects[i].object.material.color;
    console.log(oldColor);
    oldColor.getHexString();
    intersects[i].object.material.color.set('#ffffff');
    setTimeout(() => {
      intersects[i].object.material.color.set(oldColor.getHexString());
    }, 500);
  }
}

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  GridHelper,
} from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';

import { controlCamera } from './controls';
import generateWorld from './generateWorld';
import { initPost, postProcess } from './postprocessing';
import './style.css';

/** @type {Scene} */
let scene;
/** @type {PerspectiveCamera} */
let camera;
/** @type {WebGLRenderer} */
let renderer;
/** @type {EffectComposer} */
let composer;

function init() {
  scene = new Scene();
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;
  camera.position.y = 15;

  renderer = new WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const axesHelper = new AxesHelper(5);
  scene.add(axesHelper);
  axesHelper.setColors('red', 'green', 'blue');

  const gridHelper = new GridHelper(200, 20);
  scene.add(gridHelper);
  composer = new EffectComposer(renderer);

  initPost(scene, camera, composer);

  generateWorld(scene);
}

function animate() {
  requestAnimationFrame(animate);

  controlCamera(camera);

  postProcess(scene, camera);

  renderer.render(scene, camera);
  composer.render();
}

init();

animate();

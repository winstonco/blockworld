import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  GridHelper,
  Color,
  Vector3,
} from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

import { controlCamera } from './controls';
import generateWorld from './world_gen/generateWorld';
import { initPost, postProcess } from './postprocessing';
import './style.css';
import PhysicsEngine from './physics/PhysicsEngine';
import Collider3D from './physics/Collider3D';
import Rigidbody from './physics/Rigidbody';

let scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  composer: EffectComposer,
  physics: PhysicsEngine;

function init() {
  scene = new Scene();
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;
  camera.position.y = 20;
  const cameraCollider = new Collider3D(camera, [
    { start: new Vector3(0, -15, 0), direction: new Vector3(0, -1, 0) },
    { start: new Vector3(0, 0, 3), direction: new Vector3(0, 0, 1) },
    { start: new Vector3(0, 0, -3), direction: new Vector3(0, 0, -1) },
    { start: new Vector3(3, 0, 0), direction: new Vector3(1, 0, 0) },
    { start: new Vector3(-3, 0, 0), direction: new Vector3(-1, 0, 0) },
  ]);
  const cameraRB = new Rigidbody(camera, true);
  camera.userData.collider = cameraCollider;
  camera.userData.rigidbody = cameraRB;
  scene.add(camera);

  const canvas = document.getElementById('bg');
  if (!canvas) return;
  renderer = new WebGLRenderer({
    canvas: canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const gridHelper = new GridHelper(200, 20);
  scene.add(gridHelper);

  composer = new EffectComposer(renderer);
  physics = new PhysicsEngine(scene);

  initPost(scene, camera, composer);

  generateWorld(scene);
}

function animate() {
  requestAnimationFrame(animate);

  controlCamera(camera);

  physics.tick();

  postProcess(scene, camera);

  renderer.render(scene, camera);
  composer.render();
}

init();

animate();

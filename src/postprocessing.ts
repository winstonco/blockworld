import { PerspectiveCamera, Scene, Vector2 } from 'three';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

import lookingAt from './helpers/lookingAt';

let renderPass: RenderPass, outlinePass: OutlinePass;

export const initPost = (
  scene: Scene,
  camera: PerspectiveCamera,
  composer: EffectComposer
) => {
  renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  outlinePass = new OutlinePass(
    new Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera
  );
  composer.addPass(outlinePass);
};

/**
 * @param {Object3D} object
 */
export const outlineObject = (object) => {
  if (object) outlinePass.selectedObjects = [object];
};

export const postProcess = (scene, camera) => {
  outlineObject(lookingAt(camera, scene));
};

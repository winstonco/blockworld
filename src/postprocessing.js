import { Vector2 } from 'three';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

import lookingAt from './helpers/lookingAt';

let renderPass, outlinePass;

export const initPost = (scene, camera, composer) => {
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

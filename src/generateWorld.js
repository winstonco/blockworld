import { Vector3 } from 'three';

import createBlock from './helpers/createBlock';

const generateWorld = (scene) => {
  // boxes
  createBlock(scene, new Vector3(1, 1, 1));
  createBlock(scene, new Vector3(1, 1, 3));
};

export default generateWorld;

import { Scene } from 'three';
import createBlock from './createBlock';
import createTree from './createTree';

const generateWorld = (scene: Scene) => {
  // floor
  for (let x = -6; x <= 7; x++) {
    for (let y = -2; y <= 0; y++) {
      for (let z = -6; z <= 7; z++) {
        createBlock(scene, { x, y, z });
      }
    }
  }
  // world
  createTree(scene, { x: 3, y: 1, z: 4 });
};

export default generateWorld;

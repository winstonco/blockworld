import { Scene } from 'three';
import createBlock from './createBlock';
import { material_leaf, material_wood } from '../materials/materials';
import TreeType from '../types/TreeType';

const createTree = (
  scene: Scene,
  position: { x: number; y: number; z: number },
  type: TreeType = 'default'
) => {
  const { x, y, z } = position;
  if (type === 'default') {
    // trunk
    for (let i = 0; i < 5; i++) {
      createBlock(scene, { x, y: y + i, z }, material_wood);
    }
    // leaves layer 1
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        for (let k = 0; k < 2; k++) {
          createBlock(
            scene,
            { x: x - 2 + i, y: y + 3 + k, z: z - 2 + j },
            material_leaf
          );
        }
      }
    }
    // leaves layer 2
  }
};

export default createTree;

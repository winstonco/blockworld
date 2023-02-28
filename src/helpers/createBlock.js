import { Vector3, BoxGeometry, Material, Mesh } from 'three';

import { geometry_cube, material_ground } from '../materials/materials';

/**
 *
 * @param {Vector3} position
 * @param {BoxGeometry} geometry
 * @param {Material} material
 */
const createBlock = (
  scene,
  position = new Vector3(0, 0, 0),
  geometry = geometry_cube,
  material = material_ground
) => {
  const cube = new Mesh(geometry, material);
  const truePosition = new Vector3(
    position.x * 10 - 5,
    position.y * 10 - 5,
    position.z * 10 - 5
  );
  cube.position.add(truePosition);
  scene.add(cube);
  return cube;
};

export default createBlock;

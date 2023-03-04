import { Vector3, Material, Mesh, Scene, BufferGeometry } from 'three';

import { geometry_cube, material_ground } from '../materials/materials';

/**
 * @param {Scene} scene
 * @param {{x: number, y: number, z: number}} position
 * @param {Material} material
 * @param {BoxGeometry} geometry
 */
const createBlock = (
  scene: Scene,
  position: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 },
  material: Material = material_ground,
  geometry: BufferGeometry = geometry_cube
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

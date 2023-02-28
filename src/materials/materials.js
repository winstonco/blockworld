import * as THREE from 'three';

export const geometry_cube = new THREE.BoxGeometry(10, 10, 10);
export const material_ground = new THREE.MeshBasicMaterial({
  color: 0x0e8313,
  // wireframe: true,
});

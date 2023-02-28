import { Raycaster, Object3D } from 'three';

let lastLookedAt = null;

/**
 * @param {PerspectiveCamera} camera
 * @param {Object3D[]} scene
 * @param {(target: Object3D) => void} onSee
 * @param {(target: Object3D) => void} onUnSee
 */
const lookingAt = (camera, scene, onSee = () => {}, onUnSee = () => {}) => {
  const raycaster = new Raycaster();
  raycaster.setFromCamera({ x: 0, y: 0 }, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    if (lastLookedAt && lastLookedAt.id === intersects[0].object.id) {
      // Looking at same object
    } else {
      // First look at object
      if (lastLookedAt) {
        onUnSee(lastLookedAt);
      }
      lastLookedAt = intersects[0].object;
      onSee(lastLookedAt);
    }
  } else {
    lastLookedAt = null;
  }
  return lastLookedAt;
};

export default lookingAt;

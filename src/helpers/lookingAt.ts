import { Raycaster, Object3D, PerspectiveCamera, Scene } from 'three';

let lastLookedAt: Object3D | null = null;

const lookingAt = (
  camera: PerspectiveCamera,
  scene: Scene,
  onSee: (target: Object3D) => void = () => {},
  onUnSee: (target: Object3D) => void = () => {}
) => {
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

import { PerspectiveCamera, Vector3 } from 'three';
import { radToDeg } from 'three/src/math/MathUtils';
import Collider3D from './physics/Collider3D';
import Rigidbody from './physics/Rigidbody';

const controlKeys = {
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  KeyW: false,
  KeyA: false,
  KeyS: false,
  KeyD: false,
  Space: false,
};

let mouseMovements = [0, 0];

const moveScalar = 0.3;
const rotateScalar = 2;
const maxSpeed = 10;
const jumpPower = 1;

const handleKeyDown = (ev: KeyboardEvent) => {
  if (Object.keys(controlKeys).includes(ev.code)) {
    controlKeys[ev.code] = true;
  }
};

const handleKeyUp = (ev: KeyboardEvent) => {
  if (Object.keys(controlKeys).includes(ev.code)) {
    controlKeys[ev.code] = false;
  }
};

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

const controlCamera = (camera: PerspectiveCamera) => {
  const cameraDirection = camera.getWorldDirection(new Vector3());
  const cameraDirectionFlat = cameraDirection.clone().setY(0);
  const { x: vx, z: vz } = cameraDirectionFlat;
  const cameraAngle =
    cameraDirection.y < 0
      ? -cameraDirectionFlat.angleTo(cameraDirection)
      : cameraDirectionFlat.angleTo(cameraDirection);
  const motionVector = new Vector3();
  const jumpVector = new Vector3();

  // <-> mouse
  if (mouseMovements[0] !== 0) {
    camera.rotateOnWorldAxis(
      new Vector3(0, 1, 0),
      (mouseMovements[0] * rotateScalar * -1) / window.innerWidth
    );
  }
  // ^ v mouse
  if (mouseMovements[1] !== 0) {
    const amountToRotate =
      (mouseMovements[1] * rotateScalar * -1) / window.innerHeight;
    if (
      radToDeg(cameraAngle + amountToRotate) < 89 &&
      radToDeg(cameraAngle + amountToRotate) > -89
    ) {
      camera.rotateX(amountToRotate);
    }
  }

  // w
  if (controlKeys.KeyW) {
    motionVector.add(new Vector3(vx, 0, vz));
  }
  // a
  if (controlKeys.KeyA) {
    motionVector.add(new Vector3(vz, 0, vx * -1));
  }
  // s
  if (controlKeys.KeyS) {
    motionVector.add(new Vector3(vx * -1, 0, vz * -1));
  }
  // d
  if (controlKeys.KeyD) {
    motionVector.add(new Vector3(vz * -1, 0, vx));
  }

  // space
  if (controlKeys.Space) {
    jumpVector.add(new Vector3(0, jumpPower, 0));
  }

  const rb = camera.userData.rigidbody;
  if (rb instanceof Rigidbody) {
    rb.netVelocity
      .add(motionVector.normalize())
      .multiplyScalar(moveScalar)
      .clampLength(0, maxSpeed);

    const collider = camera.userData.collider;
    if (collider instanceof Collider3D) {
      if (collider.isTouchingGround) {
        rb.netAcceleration.add(jumpVector);
      }
    }
  }

  // resets
  mouseMovements = [0, 0];
};

let mouseIsLocked = false;

document.addEventListener('keyup', (ev) => {
  if (ev.key === 'e' || ev.key === 'E' || ev.key === 'Escape') {
    mouseIsLocked ? unlockMouse() : lockMouse();
  }
});

const lockMouse = async () => {
  document.querySelector('#bg')?.requestPointerLock();
  mouseIsLocked = true;
};

const unlockMouse = () => {
  mouseIsLocked = false;
  document.exitPointerLock();
};

/**
 * @param {MouseEvent} ev
 */
const handleMouseMove = (ev) => {
  if (mouseIsLocked) {
    mouseMovements = [ev.movementX, ev.movementY];
    // console.log(mouseMovements);
  } else {
    mouseMovements = [0, 0];
  }
};

document.addEventListener('mousemove', handleMouseMove);

export { controlCamera };

import { PerspectiveCamera, Vector2, Vector3 } from 'three';

const controlKeys = [
  'ArrowLeft',
  'ArrowUp',
  'ArrowDown',
  'ArrowRight',
  'w',
  'W',
  'a',
  'A',
  's',
  'S',
  'd',
  'D',
];
const controlKeysPressed = {};

let mouseMovements = [0, 0];

const moveScalar = 0.3;
const rotateScalar = 2;
const maxSpeed = 10;

/**
 * @param {KeyboardEvent} ev
 */
const handleKeyDown = (ev) => {
  if (controlKeys.includes(ev.key)) controlKeysPressed[ev.key] = true;
};

/**
 * @param {KeyboardEvent} ev
 */
const handleKeyUp = (ev) => {
  if (controlKeys.includes(ev.key)) controlKeysPressed[ev.key] = false;
  console.log(controlKeysPressed);
};

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

/**
 * @param {PerspectiveCamera} camera
 */
const controlCamera = (camera) => {
  const cameraDirection = camera.getWorldDirection(new Vector3());
  const cameraDirectionFlat = cameraDirection.clone().setY(0);
  const { x: vx, z: vz } = cameraDirectionFlat;
  const cameraAngle =
    cameraDirection.y < 0
      ? (cameraDirectionFlat.angleTo(cameraDirection) * -180) / Math.PI
      : (cameraDirectionFlat.angleTo(cameraDirection) * 180) / Math.PI;
  const motionVector = new Vector3(0, 0, 0);

  // <-> mouse
  if (mouseMovements[0] !== 0) {
    camera.rotateOnWorldAxis(
      new Vector3(0, 1, 0),
      (mouseMovements[0] * rotateScalar * -1) / window.innerWidth
    );
  }
  // ^ v mouse
  if (mouseMovements[1] !== 0) {
    if (cameraAngle > -89) {
      if (cameraAngle < 89) {
        camera.rotateX(
          (mouseMovements[1] * rotateScalar * -1) / window.innerHeight
        );
      } else {
        camera.rotateX(-0.0001);
      }
    } else {
      camera.rotateX(0.0001);
    }
  }

  /*
  // <-
  if (controlKeysPressed.ArrowLeft) {
    camera.rotateOnWorldAxis(new Vector3(0, 1, 0), rotateScalar);
  }
  // ^
  if (controlKeysPressed.ArrowUp) {
    camera.rotateX(rotateScalar);
  }
  // ->
  if (controlKeysPressed.ArrowRight) {
    camera.rotateOnWorldAxis(new Vector3(0, 1, 0), rotateScalar * -1);
  }
  // v
  if (controlKeysPressed.ArrowDown) {
    camera.rotateX(rotateScalar * -1);
  }
  */

  // w
  if (controlKeysPressed.w || controlKeysPressed.W) {
    motionVector.add(new Vector3(vx, 0, vz));
  }
  // a
  if (controlKeysPressed.a || controlKeysPressed.A) {
    motionVector.add(new Vector3(vz, 0, vx * -1));
  }
  // s
  if (controlKeysPressed.s || controlKeysPressed.S) {
    motionVector.add(new Vector3(vx * -1, 0, vz * -1));
  }
  // d
  if (controlKeysPressed.d || controlKeysPressed.D) {
    motionVector.add(new Vector3(vz * -1, 0, vx));
  }

  camera.position.add(
    motionVector.normalize().multiplyScalar(moveScalar).clampLength(0, maxSpeed)
  );

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
  document.querySelector('#bg').requestPointerLock({
    unadjustedMovement: true,
  });
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

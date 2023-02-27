import { PerspectiveCamera, Vector3 } from 'three';

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

const mouseMovements = [0, 0];

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

let directionVector = new Vector3();

/**
 * @param {PerspectiveCamera} camera
 */
const controlCamera = (camera) => {
  const moveScalar = 0.1;
  const rotateScalar = 0.001;

  directionVector = camera.getWorldDirection(new Vector3()).normalize();

  const vx = directionVector.x;
  const vz = directionVector.z;

  // <-> mouse
  if (mouseMovements[0] !== 0) {
    camera.rotateOnWorldAxis(
      new Vector3(0, 1, 0),
      mouseMovements[0] * rotateScalar * -1
    );
  }

  // ^ v mouse
  if (mouseMovements[1] !== 0) {
    camera.rotateX(mouseMovements[1] * rotateScalar * -1);
  }

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

  // w
  if (controlKeysPressed.w || controlKeysPressed.W) {
    camera.position.x += vx * moveScalar;
    camera.position.z += vz * moveScalar;
  }
  // a
  if (controlKeysPressed.a || controlKeysPressed.A) {
    const leftVector = directionVector.cross(new Vector3(0, -1, 0));
    const vx = leftVector.x;
    const vz = leftVector.z;

    camera.position.x += vx * moveScalar;
    camera.position.z += vz * moveScalar;
  }
  // s
  if (controlKeysPressed.s || controlKeysPressed.S) {
    camera.position.x += vx * moveScalar * -1;
    camera.position.z += vz * moveScalar * -1;
  }
  // d
  if (controlKeysPressed.d || controlKeysPressed.D) {
    const rightVector = directionVector.cross(new Vector3(0, 1, 0));
    const vx = rightVector.x;
    const vz = rightVector.z;
    camera.position.x += vx * moveScalar;
    camera.position.z += vz * moveScalar;
  }

  // resets
  mouseMovements[0] = 0;
  mouseMovements[1] = 0;
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
    mouseMovements[0] = ev.movementX;
    mouseMovements[1] = ev.movementY;
  } else {
    mouseMovements[0] = 0;
    mouseMovements[1] = 0;
  }
};

document.addEventListener('mousemove', handleMouseMove);

export { controlCamera };

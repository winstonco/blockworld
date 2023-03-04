import { Object3D, Vector3 } from 'three';

export default class Rigidbody {
  object: Object3D;
  gravity: boolean;
  netAcceleration: Vector3;
  netVelocity: Vector3;
  drag: number;

  constructor(object: Object3D, doGravity: boolean, drag = 1) {
    this.object = object;
    this.gravity = doGravity;
    this.netAcceleration = new Vector3();
    this.netVelocity = new Vector3();
    this.drag = drag;
  }

  applyPhysics() {
    this.applyAcceleration();
    this.applyVelocity();
  }

  private applyAcceleration() {
    this.netVelocity.add(this.netAcceleration);
    this.netAcceleration.multiplyScalar(this.drag);
  }

  private applyVelocity() {
    this.object.position.add(this.netVelocity);
  }
}

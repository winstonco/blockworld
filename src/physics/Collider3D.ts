import { Intersection, Event, Object3D, Raycaster, Vector3, Ray } from 'three';
import BoundaryType from '../types/BoundaryType';

export default class Collider3D {
  private object: Object3D;
  private boundaries: BoundaryType[];

  private _isTouchingGround: boolean;

  constructor(object: Object3D, boundaries: BoundaryType[]) {
    this.object = object;
    this.boundaries = boundaries;
    this._isTouchingGround = false;
  }

  collide(collidableObjects: Object3D[]): BoundaryType[] {
    const collisions: BoundaryType[] = [];
    this.boundaries.forEach((boundary) => {
      const rc = new Raycaster(
        this.object.position.clone().add(boundary.start),
        boundary.direction
      );
      const intersections = rc.intersectObjects(collidableObjects);
      if (intersections.length > 0) {
        if (Math.round(intersections[0].distance) === 0) {
          collisions.push(boundary);
        }
      }
    });
    this._isTouchingGround = collisions.some(
      (boundary) => boundary.direction.y === -1
    );
    return collisions;
  }

  get isTouchingGround() {
    return this._isTouchingGround;
  }
}

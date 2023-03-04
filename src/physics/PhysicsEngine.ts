import { Object3D, Scene, Vector3 } from 'three';
import Collider3D from './Collider3D';
import Rigidbody from './Rigidbody';

export default class PhysicsEngine {
  private gravityScalar: number;
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
    this.gravityScalar = -0.05;
  }

  tick() {
    this.scene.children.forEach((childObj) => {
      this.doGravity(childObj);
      this.doCollisions(childObj);

      this.doPhysics(childObj);
    });
  }

  private doPhysics(object: Object3D) {
    const rb = object.userData.rigidbody;
    if (rb instanceof Rigidbody) {
      rb.applyPhysics();
    }
  }

  private doGravity(object: Object3D) {
    const rb = object.userData.rigidbody;
    if (rb instanceof Rigidbody) {
      if (rb.netAcceleration.y > -0.5) {
        rb.netAcceleration.add(new Vector3(0, this.gravityScalar, 0));
      }
    }
  }

  private doCollisions(object: Object3D) {
    const collider = object.userData.collider;
    const rb = object.userData.rigidbody;
    if (collider instanceof Collider3D && rb instanceof Rigidbody) {
      const collisions = collider.collide(this.scene.children);
      collisions.forEach((boundary) => {
        if (rb.netVelocity.clone().angleTo(boundary.direction) < Math.PI / 2) {
          const collisionVectorVel = rb.netVelocity
            .clone()
            .projectOnVector(boundary.direction)
            .negate();
          rb.object.position.add(collisionVectorVel);
        }
        if (
          rb.netAcceleration.clone().angleTo(boundary.direction) <
          Math.PI / 2
        ) {
          const collisionVectorAcc = rb.netAcceleration
            .clone()
            .projectOnVector(boundary.direction)
            .negate();
          rb.netAcceleration.add(collisionVectorAcc);
        }
      });
    }
  }
}

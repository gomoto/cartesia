import * as BABYLON from 'babylonjs';
import { CartesianPoint } from '../state';

export function updatePoint(sphere: BABYLON.AbstractMesh, currentPoint: CartesianPoint, previousPoint?: CartesianPoint): void {
  sphere.position.x = currentPoint.position.x;
  sphere.position.y = currentPoint.position.y;
  sphere.position.z = currentPoint.position.z;
}

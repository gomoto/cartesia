import * as BABYLON from 'babylonjs';
import { CartesianSphere } from '../state';

export function updateSphere(sphere: BABYLON.AbstractMesh, currentSphere: CartesianSphere, previousSphere?: CartesianSphere): void {
  sphere.position.x = currentSphere.position.x;
  sphere.position.y = currentSphere.position.y;
  sphere.position.z = currentSphere.position.z;
}

import * as BABYLON from 'babylonjs';
import { CartesianSphere } from '../state';

export function updateSphere(sphere: BABYLON.AbstractMesh, currentSphere: CartesianSphere): void {
  sphere.position.x = currentSphere.position.x;
  sphere.position.y = currentSphere.position.y;
  sphere.position.z = currentSphere.position.z;
  sphere.scaling = new BABYLON.Vector3(
    currentSphere.scaling.x,
    currentSphere.scaling.y,
    currentSphere.scaling.z
  );
}

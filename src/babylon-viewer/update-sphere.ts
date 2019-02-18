import * as BABYLON from 'babylonjs';
import { CartesianSphere } from '../state';

export function updateSphere(scene: BABYLON.Scene, currentSphere: CartesianSphere, previousSphere?: CartesianSphere): void {
  const mesh = scene.getMeshByName(currentSphere.id);
  if (!mesh) {
    return;
  }
  mesh.position.x = currentSphere.position.x;
  mesh.position.y = currentSphere.position.y;
  mesh.position.z = currentSphere.position.z;
  mesh.scaling = new BABYLON.Vector3(
    currentSphere.scaling.x,
    currentSphere.scaling.y,
    currentSphere.scaling.z
  );
  if (!previousSphere || currentSphere.color !== previousSphere.color) {
    const material = new BABYLON.StandardMaterial(`material-${currentSphere.id}`, scene);
    material.diffuseColor = BABYLON.Color3.FromHexString(currentSphere.color);
    mesh.material = material;
  }
}

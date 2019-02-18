import * as BABYLON from 'babylonjs';
import { CartesianSphere } from '../state';

export function updateSphere(scene: BABYLON.Scene, sphere: CartesianSphere): void {
  const mesh = scene.getMeshByName(sphere.id);
  if (!mesh) {
    return;
  }
  mesh.position.x = sphere.position.x;
  mesh.position.y = sphere.position.y;
  mesh.position.z = sphere.position.z;
  mesh.scaling = new BABYLON.Vector3(
    sphere.scaling.x,
    sphere.scaling.y,
    sphere.scaling.z
  );
  const material = new BABYLON.StandardMaterial(`material-${sphere.id}`, scene);
  material.diffuseColor = BABYLON.Color3.FromHexString(sphere.color);
  mesh.material = material;
}

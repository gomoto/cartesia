import * as BABYLON from 'babylonjs';
import { CartesianSphere } from '../state';

export function createSphere(scene: BABYLON.Scene, sphere: CartesianSphere): BABYLON.Mesh {
  return BABYLON.MeshBuilder.CreateSphere(sphere.id, {
    segments: 16,
    diameter: 1,
    updatable: false,
    sideOrientation: BABYLON.Mesh.FRONTSIDE,
  }, scene);
}

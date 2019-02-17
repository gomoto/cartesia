import * as BABYLON from 'babylonjs';
import { CartesianObject } from '../state';

export function updateObjectSelection(scene: BABYLON.Scene, highlightLayer: BABYLON.HighlightLayer, objects: CartesianObject[], selectionColor: BABYLON.Color3): void {
  for (let o of objects) {
    const mesh = <BABYLON.Mesh> scene.getMeshByName(o.id);
    if (mesh) {
      if (o.isSelected) {
        highlightLayer.addMesh(mesh, selectionColor);
      } else {
        highlightLayer.removeMesh(mesh);
      }
    }
  }
}

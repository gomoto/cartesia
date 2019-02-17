import * as BABYLON from 'babylonjs';
import { CartesianObject, HexColor3 } from '../state';

export function updateObjectSelection(scene: BABYLON.Scene, highlightLayer: BABYLON.HighlightLayer, objects: CartesianObject[], selectionColor: HexColor3): void {
  for (let o of objects) {
    const mesh = <BABYLON.Mesh> scene.getMeshByName(o.id);
    if (mesh) {
      if (o.isSelected) {
        highlightLayer.addMesh(mesh, BABYLON.Color3.FromHexString(selectionColor));
      } else {
        highlightLayer.removeMesh(mesh);
      }
    }
  }
}

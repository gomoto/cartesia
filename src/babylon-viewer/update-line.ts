import * as BABYLON from 'babylonjs';
import { CartesianLine } from '../state';

export function updateLine(scene: BABYLON.Scene, currentLine: CartesianLine, previousLine?: CartesianLine): void {
  const mesh = scene.getMeshByName(currentLine.id);
  if (!mesh) {
    return;
  }
  const linesMesh = <BABYLON.LinesMesh> mesh;
  if (
    !previousLine ||
    currentLine.start !== previousLine.start ||
    currentLine.end !== previousLine.end ||
    currentLine.color !== previousLine.color
  ) {
    // Update existing lines mesh.
    const pointColor = BABYLON.Color3.FromHexString(currentLine.color).toColor4();
    BABYLON.MeshBuilder.CreateLines(currentLine.id, {
      instance: linesMesh,
      points: [
        new BABYLON.Vector3(currentLine.start.x, currentLine.start.y, currentLine.start.z),
        new BABYLON.Vector3(currentLine.end.x, currentLine.end.y, currentLine.end.z),
      ],
      colors: [
        pointColor,
        pointColor,
      ],
    }, scene);
  }
}

import * as BABYLON from 'babylonjs';
import { CartesianLine } from '../state';

export function createLine(scene: BABYLON.Scene, line: CartesianLine): BABYLON.Mesh {
  return BABYLON.MeshBuilder.CreateLines(line.id, {
    points: [
      new BABYLON.Vector3(line.start.x, line.start.y, line.start.z),
      new BABYLON.Vector3(line.end.x, line.end.y, line.end.z),
    ]
  }, scene);
}

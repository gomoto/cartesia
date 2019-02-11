import * as BABYLON from 'babylonjs';
import { CartesianGrid } from '../state';

/**
 * Create grid in scene.
 */
export function createGrid(scene: BABYLON.Scene, grid: CartesianGrid): BABYLON.LinesMesh {
  const {
    xMin,
    xMax,
    xStep,
    yMin,
    yMax,
    yStep,
    zMin,
    zMax,
    zStep,
    color,
  } = grid;

  const lines: [BABYLON.Vector3, BABYLON.Vector3][] = [];

  // x → y → z
  for (let x = xMin; x <= xMax; x+=xStep) {
    for (let y = yMin; y <= yMax; y+=yStep) {
      lines.push([new BABYLON.Vector3(x, y, zMin), new BABYLON.Vector3(x, y, zMax)]);
    }
  }

  // y → z → x
  for (let y = yMin; y <= yMax; y+=yStep) {
    for (let z = zMin; z <= zMax; z+=zStep) {
      lines.push([new BABYLON.Vector3(xMin, y, z), new BABYLON.Vector3(xMax, y, z)]);
    }
  }

  // z → x → y
  for (let z = zMin; z <= zMax; z+=zStep) {
    for (let x = xMin; x <= xMax; x+=xStep) {
      lines.push([new BABYLON.Vector3(x, yMin, z), new BABYLON.Vector3(x, yMax, z)]);
    }
  }

  const gridMesh = BABYLON.MeshBuilder.CreateLineSystem('grid', {
    lines,
    // updatable: true,
  }, scene);

  const { r, g, b } = color;
  gridMesh.color = new BABYLON.Color3(r, g, b);

  return gridMesh;
}

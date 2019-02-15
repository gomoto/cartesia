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

  // Grid lines should be centered around 0 in all three dimensions
  const xs: number[] = [];
  const ys: number[] = [];
  const zs: number[] = [];

  // x values
  const xMinRounded = Math.ceil(xMin / xStep) * xStep; // first x value greater than xMin
  for (let x = xMinRounded; x <= xMax; x += xStep) {
    xs.push(x);
  }

  // y values
  const yMinRounded = Math.ceil(yMin / yStep) * yStep; // first y value greater than yMin
  for (let y = yMinRounded; y <= yMax; y += yStep) {
    ys.push(y);
  }

  // z values
  const zMinRounded = Math.ceil(zMin / zStep) * zStep; // first z value greater than zMin
  for (let z = zMinRounded; z <= zMax; z += zStep) {
    zs.push(z);
  }

  // x → y → z
  xs.forEach((x) => {
    ys.forEach((y) => {
      lines.push([new BABYLON.Vector3(x, y, zMin), new BABYLON.Vector3(x, y, zMax)]);
    });
  });

  // y → z → x
  ys.forEach((y) => {
    zs.forEach((z) => {
      lines.push([new BABYLON.Vector3(xMin, y, z), new BABYLON.Vector3(xMax, y, z)]);
    });
  });

  // z → x → y
  zs.forEach((z) => {
    xs.forEach((x) => {
      lines.push([new BABYLON.Vector3(x, yMin, z), new BABYLON.Vector3(x, yMax, z)]);
    });
  });

  const gridMesh = BABYLON.MeshBuilder.CreateLineSystem('grid', {
    lines,
    // updatable: true,
  }, scene);

  const { r, g, b } = color;
  gridMesh.color = new BABYLON.Color3(r, g, b);

  gridMesh.visibility = grid.isVisible ? 1 : 0;

  return gridMesh;
}

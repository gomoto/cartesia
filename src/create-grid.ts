import * as BABYLON from 'babylonjs';

/**
 * Create grid in scene.
 */
export function createGrid(scene: BABYLON.Scene): void {
  const xyGridLines = createXYGrid(-10, 5, -4, 2);

  const xyGrid = BABYLON.MeshBuilder.CreateLineSystem('xyGrid', {
    lines: xyGridLines,
    updatable: true,
  }, scene);
}

function createXYGrid(xMin: number, xMax: number, yMin: number, yMax: number): [BABYLON.Vector3, BABYLON.Vector3][] {
  const xLines: [BABYLON.Vector3, BABYLON.Vector3][] = [];
  for (let x = xMin; x <= xMax; x++) {
    xLines.push([new BABYLON.Vector3(x, yMin), new BABYLON.Vector3(x, yMax)]);
  }
  const yLines: [BABYLON.Vector3, BABYLON.Vector3][] = [];
  for (let y = yMin; y <= yMax; y++) {
    yLines.push([new BABYLON.Vector3(xMin, y), new BABYLON.Vector3(xMax, y)]);
  }
  const lines = [
    ...xLines,
    ...yLines,
  ];
  return lines;
}

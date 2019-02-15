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
    xStepMajor,
    yMin,
    yMax,
    yStep,
    yStepMajor,
    zMin,
    zMax,
    zStep,
    zStepMajor,
    color,
    colorMajor,
  } = grid;

  const MINOR_COLOR_PAIR: [BABYLON.Color4, BABYLON.Color4] = [new BABYLON.Color4(color.r, color.g, color.b), new BABYLON.Color4(color.r, color.g, color.b)];
  const MAJOR_COLOR_PAIR: [BABYLON.Color4, BABYLON.Color4] = [new BABYLON.Color4(colorMajor.r, colorMajor.g, colorMajor.b), new BABYLON.Color4(colorMajor.r, colorMajor.g, colorMajor.b)];

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

  const colors: [BABYLON.Color4, BABYLON.Color4][] = [];

  // x → y → z
  xs.forEach((x) => {
    const isMajorX = (x % xStepMajor) === 0;
    ys.forEach((y) => {
      const isMajorY = (y % yStepMajor) === 0;
      lines.push([new BABYLON.Vector3(x, y, zMin), new BABYLON.Vector3(x, y, zMax)]);
      (isMajorX && isMajorY) ? colors.push(MAJOR_COLOR_PAIR) : colors.push(MINOR_COLOR_PAIR);
    });
  });

  // y → z → x
  ys.forEach((y) => {
    const isMajorY = (y % yStepMajor) === 0;
    zs.forEach((z) => {
      const isMajorZ = (z % zStepMajor) === 0;
      lines.push([new BABYLON.Vector3(xMin, y, z), new BABYLON.Vector3(xMax, y, z)]);
      (isMajorY && isMajorZ) ? colors.push(MAJOR_COLOR_PAIR) : colors.push(MINOR_COLOR_PAIR);
    });
  });

  // z → x → y
  zs.forEach((z) => {
    const isMajorZ = (z % zStepMajor) === 0;
    xs.forEach((x) => {
      const isMajorX = (x % xStepMajor) === 0;
      lines.push([new BABYLON.Vector3(x, yMin, z), new BABYLON.Vector3(x, yMax, z)]);
      (isMajorZ && isMajorX) ? colors.push(MAJOR_COLOR_PAIR) : colors.push(MINOR_COLOR_PAIR);
    });
  });

  const gridMesh = BABYLON.MeshBuilder.CreateLineSystem('grid', {
    colors,
    lines,
    // updatable: true,
  }, scene);

  gridMesh.visibility = grid.isVisible ? 1 : 0;

  return gridMesh;
}

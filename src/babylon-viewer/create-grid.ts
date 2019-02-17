import * as BABYLON from 'babylonjs';
import { CartesianGrid } from '../state';

/**
 * Create grid in scene.
 */
export function createGrid(scene: BABYLON.Scene, grid: CartesianGrid): BABYLON.LinesMesh {
  const {
    xMin,
    xMax,
    xStepMinor,
    xStepMajor,
    yMin,
    yMax,
    yStepMinor,
    yStepMajor,
    zMin,
    zMax,
    zStepMinor,
    zStepMajor,
    colorMinor,
    colorMajor,
  } = grid;

  // Use separate colors for major and minor grid lines
  const MINOR_COLOR = BABYLON.Color3.FromHexString(colorMinor).toColor4();
  const MAJOR_COLOR = BABYLON.Color3.FromHexString(colorMajor).toColor4();
  const MINOR_COLOR_PAIR: [BABYLON.Color4, BABYLON.Color4] = [MINOR_COLOR, MINOR_COLOR];
  const MAJOR_COLOR_PAIR: [BABYLON.Color4, BABYLON.Color4] = [MAJOR_COLOR, MAJOR_COLOR];

  const colors: [BABYLON.Color4, BABYLON.Color4][] = [];
  const lines: [BABYLON.Vector3, BABYLON.Vector3][] = [];

  // Grid lines should be centered around 0 in all three dimensions

  // Major values
  const xMajor: number[] = [];
  const yMajor: number[] = [];
  const zMajor: number[] = [];
  const xMinRoundedMajor = Math.ceil(xMin / xStepMajor) * xStepMajor; // first x value greater than xMin
  for (let x = xMinRoundedMajor; x <= xMax; x += xStepMajor) {
    xMajor.push(x);
  }
  const yMinRoundedMajor = Math.ceil(yMin / yStepMajor) * yStepMajor; // first y value greater than yMin
  for (let y = yMinRoundedMajor; y <= yMax; y += yStepMajor) {
    yMajor.push(y);
  }
  const zMinRoundedMajor = Math.ceil(zMin / zStepMajor) * zStepMajor; // first z value greater than zMin
  for (let z = zMinRoundedMajor; z <= zMax; z += zStepMajor) {
    zMajor.push(z);
  }

  // Minor values, excluding major values
  const xMinor: number[] = [];
  const yMinor: number[] = [];
  const zMinor: number[] = [];
  const xMinRounded = Math.ceil(xMin / xStepMinor) * xStepMinor; // first x value greater than xMin
  for (let x = xMinRounded; x <= xMax; x += xStepMinor) {
    if (x % xStepMajor === 0) {
      continue;
    }
    xMinor.push(x);
  }
  const yMinRounded = Math.ceil(yMin / yStepMinor) * yStepMinor; // first y value greater than yMin
  for (let y = yMinRounded; y <= yMax; y += yStepMinor) {
    if (y % yStepMajor === 0) {
      continue;
    }
    yMinor.push(y);
  }
  const zMinRounded = Math.ceil(zMin / zStepMinor) * zStepMinor; // first z value greater than zMin
  for (let z = zMinRounded; z <= zMax; z += zStepMinor) {
    if (z % zStepMajor === 0) {
      continue;
    }
    zMinor.push(z);
  }

  const xs = [...xMajor, ...xMinor];
  const ys = [...yMajor, ...yMinor];
  const zs = [...zMajor, ...zMinor];

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

export interface State {
  backgroundColor: HexColor3;
  selectionColor: HexColor3;
  grid: CartesianGrid;
  objects: CartesianObject[];
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

// Ellipsoid
export interface CartesianSphere {
  id: string;
  objectType: 'sphere';
  isSelected: boolean;
  position: Vector3;
  scaling: Vector3;
  isScalingProportional: boolean;
}

export interface CartesianLine {
  id: string;
  objectType: 'line';
  isSelected: boolean;
  start: Vector3;
  end: Vector3;
}

export type CartesianObject = (
  CartesianSphere |
  CartesianLine
);

export interface CartesianGrid {
  isVisible: boolean;
  xMin: number;
  xMax: number;
  xStepMinor: number;
  xStepMajor: number;
  yMin: number;
  yMax: number;
  yStepMinor: number;
  yStepMajor: number;
  zMin: number;
  zMax: number;
  zStepMinor: number;
  zStepMajor: number;
  colorMinor: HexColor3;
  colorMajor: HexColor3;
}

export type HexColor3 = string;

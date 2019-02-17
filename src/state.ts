export interface State {
  backgroundColor: HexColor3;
  grid: CartesianGrid;
  objects: CartesianObject[];
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface CartesianPoint {
  id: string;
  objectType: 'point';
  isSelected: boolean;
  position: Vector3;
}

export interface CartesianLine {
  id: string;
  objectType: 'line';
  isSelected: boolean;
  start: Vector3;
  end: Vector3;
}

export type CartesianObject = (
  CartesianPoint |
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

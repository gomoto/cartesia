export interface State {
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

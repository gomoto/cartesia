export interface State {
  points: CartesianPoint[];
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface CartesianPoint {
  id: string;
  objectType: 'point';
  position: Vector3;
}

export interface CartesianLine {
  id: string;
  objectType: 'line';
  start: Vector3;
  end: Vector3;
}

export type CartesianObject = (
  CartesianPoint |
  CartesianLine
);

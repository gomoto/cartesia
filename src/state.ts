export interface State {
  points: CartesianPoint[];
}

export interface CartesianPoint {
  id: string;
  x: number;
  y: number;
  z: number;
}

import { CartesianObject, CartesianGrid, HexColor3 } from '../state';

export interface ViewerProps {
  readable: DifferentialProps<ViewerReadableProps>;
  callable: ViewerCallableProps;
}

export interface DifferentialProps<T> {
  previous: T;
  current: T;
}

export interface ViewerReadableProps {
  backgroundColor: HexColor3;
  selectionColor: HexColor3;
  grid: CartesianGrid;
  objects: CartesianObject[];
}

export interface ViewerCallableProps {
  onSelectObject(object: CartesianObject): void;
}

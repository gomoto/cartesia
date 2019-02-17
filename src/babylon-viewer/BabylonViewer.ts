import { CartesianGrid, CartesianObject, HexColor3 } from '../state';

export interface BabylonViewer {
  engine: BABYLON.Engine;
  scene: BABYLON.Scene;
  gridMesh: BABYLON.LinesMesh;
  highlightLayer: BABYLON.HighlightLayer;
}

export interface BabylonViewerInput {
  backgroundColor: HexColor3;
  selectionColor: HexColor3;
  grid: CartesianGrid;
  objects: CartesianObject[];
}

export interface Differential<T> {
  previous: T;
  current: T;
}

import { CartesianObject } from '../state';
import { BabylonViewerInput } from '../babylon-viewer/BabylonViewer';

export interface ViewerProps {
  readable: ViewerReadableProps;
  callable: ViewerCallableProps;
}

export type ViewerReadableProps = BabylonViewerInput;

export interface ViewerCallableProps {
  onSelectObject(object: CartesianObject): void;
}

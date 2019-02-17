import { CartesianObject } from '../state';
import { BabylonViewerInput, Differential } from '../babylon-viewer/BabylonViewer';

export interface ViewerProps {
  readable: ViewerReadableProps;
  callable: ViewerCallableProps;
}

export type ViewerReadableProps = Differential<BabylonViewerInput>;

export interface ViewerCallableProps {
  onSelectObject(object: CartesianObject): void;
}

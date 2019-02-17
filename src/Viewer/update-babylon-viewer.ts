import { BabylonViewer } from './BabylonViewer';
import { ViewerProps } from './ViewerProps';
import { createGrid } from './create-grid';
import { updateClearColor } from './update-clear-color';
import { updateObjects } from './update-objects';
import { updateObjectSelection } from './update-object-selection';

export function updateBabylonViewer(viewer: BabylonViewer, props: ViewerProps): void {
  if (viewer.scene) {
    updateClearColor(viewer.scene, props.readable.current.backgroundColor);
    if (viewer.gridMesh) {
      if (props.readable.current.grid !== props.readable.previous.grid) {
        // Recreate grid. Can't get LineSystem updatable to work here. Should it?
        viewer.gridMesh.dispose();
        viewer.gridMesh = createGrid(viewer.scene, props.readable.current.grid);
      }
    }
    if (props.readable.current.objects !== props.readable.previous.objects) {
      updateObjects(viewer.scene, props.readable.current.objects, props.readable.previous.objects);
    }
    if (props.readable.current.objects !== props.readable.previous.objects || props.readable.previous.selectionColor !== props.readable.current.selectionColor) {
      updateObjectSelection(viewer.scene, viewer.highlightLayer!, props.readable.current.objects, props.readable.current.selectionColor);
    }
  }
}

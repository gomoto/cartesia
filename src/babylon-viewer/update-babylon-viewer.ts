import { BabylonViewer, BabylonViewerInput, Differential } from './BabylonViewer';
import { createGrid } from './create-grid';
import { updateClearColor } from './update-clear-color';
import { updateObjects } from './update-objects';
import { updateObjectSelection } from './update-object-selection';

export function updateBabylonViewer(viewer: BabylonViewer, input: Differential<BabylonViewerInput>): void {
  updateClearColor(viewer.scene, input.current.backgroundColor);
  if (input.current.grid !== input.previous.grid) {
    // Recreate grid. Can't get LineSystem updatable to work here. Should it?
    viewer.gridMesh.dispose();
    viewer.gridMesh = createGrid(viewer.scene, input.current.grid);
  }
  if (input.current.objects !== input.previous.objects) {
    updateObjects(viewer.scene, input.current.objects, input.previous.objects);
  }
  if (input.current.objects !== input.previous.objects || input.previous.selectionColor !== input.current.selectionColor) {
    updateObjectSelection(viewer.scene, viewer.highlightLayer!, input.current.objects, input.current.selectionColor);
  }
}

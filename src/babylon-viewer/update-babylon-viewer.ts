import { BabylonViewer, BabylonViewerInput } from './BabylonViewer';
import { createGrid } from './create-grid';
import { updateClearColor } from './update-clear-color';
import { updateObjects } from './update-objects';
import { updateObjectSelection } from './update-object-selection';

export function updateBabylonViewer(viewer: BabylonViewer, currentInput: BabylonViewerInput, previousInput: BabylonViewerInput): void {
  updateClearColor(viewer.scene, currentInput.backgroundColor);
  if (currentInput.grid !== previousInput.grid) {
    // Recreate grid. Can't get LineSystem updatable to work here. Should it?
    viewer.gridMesh.dispose();
    viewer.gridMesh = createGrid(viewer.scene, currentInput.grid);
  }
  if (currentInput.objects !== previousInput.objects) {
    updateObjects(viewer.scene, currentInput.objects, previousInput.objects);
  }
  if (currentInput.objects !== previousInput.objects || previousInput.selectionColor !== currentInput.selectionColor) {
    updateObjectSelection(viewer.scene, viewer.highlightLayer!, currentInput.objects, currentInput.selectionColor);
  }
}

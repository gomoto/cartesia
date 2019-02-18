import { BabylonViewer, BabylonViewerInput } from './BabylonViewer';
import { createGrid } from './create-grid';
import { setBackgroundColor } from './set-background-color';
import { updateObjects } from './update-objects';
import { updateObjectSelection } from './update-object-selection';

/**
 * It would be possible to request only current input and use the existing viewer state as the previous input,
 * but having both allows this function to quickly prune unneeded update branches.
 */
export function updateBabylonViewer(viewer: BabylonViewer, currentInput: BabylonViewerInput, previousInput: BabylonViewerInput): void {
  if (currentInput.backgroundColor !== previousInput.backgroundColor) {
    setBackgroundColor(viewer.scene, currentInput.backgroundColor);
  }
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

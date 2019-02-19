import { BabylonViewer, BabylonViewerInput } from './BabylonViewer';
import { createGrid } from './create-grid';
import { createMaterials } from './materials';
import { createMiscellaneous } from './create-miscellaneous';
import { createScene } from './create-scene';
import { setBackgroundColor } from './set-background-color';
import { onMeshClick } from './on-mesh-click';

export function createBabylonViewer(canvas: HTMLCanvasElement, input: BabylonViewerInput, listeners: Listeners): BabylonViewer {
  // Create engine
  const enableAntialiasing = true;
  const adaptToDeviceRatio = true;
  const engine = new BABYLON.Engine(
    canvas,
    enableAntialiasing,
    {
      preserveDrawingBuffer: true,
      stencil: true
    },
    adaptToDeviceRatio
  );

  // Create scene
  const scene = createScene(engine);
  setBackgroundColor(scene, input.backgroundColor);
  const highlightLayer = new BABYLON.HighlightLayer('highlight', scene);
  createMaterials(scene);
  const gridMesh = createGrid(scene, input.grid);
  gridMesh.isPickable = false;
  // createMiscellaneous(scene);
  onMeshClick(scene, (mesh) => {
    if (mesh) {
      listeners.onObjectClick(mesh.name);
    }
  });

  // The render loop
  engine.runRenderLoop(function() {
    scene.render();
  });

  return {
    engine,
    scene,
    gridMesh,
    highlightLayer,
  };
}

export interface Listeners {
  onObjectClick(objectId: string): void;
}

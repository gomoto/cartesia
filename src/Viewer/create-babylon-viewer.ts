import { BabylonViewer } from './BabylonViewer';
import { ViewerProps } from './ViewerProps';
import { createGrid } from './create-grid';
import { createMaterials } from './materials';
import { createMiscellaneous } from './create-miscellaneous';
import { createScene } from './create-scene';
import { updateClearColor } from './update-clear-color';
import { onMeshClick } from './on-mesh-click';

export function createBabylonViewer(canvas: HTMLCanvasElement, props: ViewerProps, listeners: Listeners): BabylonViewer {
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
  updateClearColor(scene, props.readable.current.backgroundColor);
  const highlightLayer = new BABYLON.HighlightLayer('highlight', scene);
  createMaterials(scene);
  const gridMesh = createGrid(scene, props.readable.current.grid);
  gridMesh.isPickable = false;
  createMiscellaneous(scene);
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

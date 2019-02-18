import * as BABYLON from 'babylonjs';

/**
 * Create scene with camera and lighting.
 */
export function createScene(engine: BABYLON.Engine): BABYLON.Scene {
  // Create Scene object
  const scene = new BABYLON.Scene(engine);

  // Create an ArcRotateCamera, and set its rotation target to the origin
  const camera = new BABYLON.ArcRotateCamera('mainCamera', - Math.PI/4 /* within xz plane */, Math.PI/8 /* within xy plane */, 50, BABYLON.Vector3.Zero(), scene);
  camera.inertia = 0;
  camera.angularSensibilityX = 250;
  camera.angularSensibilityY = 250;

  // Attach the camera to the canvas
  camera.attachControl(engine.getRenderingCanvas() as HTMLCanvasElement, false);
  // Disconnet keyboard arrows from camera rotation
  camera.inputs.remove(camera.inputs.attached.keyboard);

  // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
  const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

  return scene;
}

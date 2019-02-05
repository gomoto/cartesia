import * as BABYLON from 'babylonjs';

export function createScene(engine: BABYLON.Engine): BABYLON.Scene {
  // Create Scene object
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.5, 0.5, 0.5, 1);

  // Create an ArcRotateCamera, and set its rotation target to the origin
  const camera = new BABYLON.ArcRotateCamera('mainCamera', 0, 0, 10, BABYLON.Vector3.Zero(), scene);
  camera.inertia = 0;
  camera.angularSensibilityX = 250;
  camera.angularSensibilityY = 250;

  // Attach the camera to the canvas
  camera.attachControl(engine.getRenderingCanvas(), false);

  // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
  var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

  // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
  var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);

  // Move the sphere upward 1/2 of its height
  sphere.position.y = 1;

  // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
  var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);

  const lines = createXYGrid(-10, 10, -10, 10);

  const linesystem = BABYLON.MeshBuilder.CreateLineSystem('axes', {
    lines,
    updatable: true,
  }, scene);

  return scene;
}

function createXYGrid(xMin: number, xMax: number, yMin: number, yMax: number): BABYLON.Vector3[][] {
  const xLines: [BABYLON.Vector3, BABYLON.Vector3][] = [];
  for (let x = xMin; x <= xMax; x++) {
    xLines.push([new BABYLON.Vector3(x, yMin), new BABYLON.Vector3(x, yMax)]);
  }
  const yLines: [BABYLON.Vector3, BABYLON.Vector3][] = [];
  for (let y = yMin; y <= yMax; y++) {
    yLines.push([new BABYLON.Vector3(xMin, y), new BABYLON.Vector3(xMax, y)]);
  }
  const lines = [
    ...xLines,
    ...yLines,
  ];
  return lines;
}

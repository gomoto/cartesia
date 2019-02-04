import * as BABYLON from 'babylonjs';

const canvas = <HTMLCanvasElement> document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

function createScene(): BABYLON.Scene {
  // Create Scene object
  var scene = new BABYLON.Scene(engine);
  // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
  var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
  // Target the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  // Attach the camera to the canvas
  camera.attachControl(canvas, false);
  // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
  var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
  // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
  var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
  // Move the sphere upward 1/2 of its height
  sphere.position.y = 1;
  // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
  var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
  // Return the created scene
  return scene;
}

// Create scene
const scene = createScene();

// The render loop
engine.runRenderLoop(function(){
  scene.render();
});

// When window resizes, resize the Babylon engine
window.addEventListener('resize', function(){
  engine.resize();
});

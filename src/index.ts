import * as BABYLON from 'babylonjs';
import { createScene } from './create-scene';

const canvas = <HTMLCanvasElement> document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

const scene = createScene(canvas, engine);

// The render loop
engine.runRenderLoop(function(){
  scene.render();
});

// When window resizes, resize the Babylon engine
window.addEventListener('resize', function(){
  engine.resize();
});

import * as BABYLON from 'babylonjs';
import { createScene } from './create-scene';
import { createStore } from 'redux';
import { reducer } from './reducer';
import * as stateSelector from './selector';

const store = createStore(reducer);

const canvas = <HTMLCanvasElement> document.getElementById('renderCanvas');

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

const scene = createScene(engine);

// The render loop
engine.runRenderLoop(function(){
  scene.render();
});

// When window resizes, resize the Babylon engine
window.addEventListener('resize', function(){
  engine.resize();
});

// Update scene when state changes
store.subscribe(() => {
  const points = stateSelector.getPoints(store.getState());
  for (let point of points) {
    const mesh = scene.getMeshByName(point.id);
    if (!mesh) {
      const sphere = BABYLON.Mesh.CreateSphere(point.id, 32, 1, scene, false, BABYLON.Mesh.FRONTSIDE);
      sphere.position.x = point.x;
      sphere.position.y = point.y;
      sphere.position.z = point.z;
    }
  }
});

document.body.onclick = function() {
  const x = 5 * Math.random();
  const y = 5 * Math.random();
  const z = 5 * Math.random();
  store.dispatch({type: 'ADD_POINT', payload: {x, y, z}});
}

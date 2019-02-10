import * as BABYLON from 'babylonjs';
import { createScene } from './create-scene';
import { createStore } from 'redux';
import { reducer } from './reducer';
import { State } from './state';
import { updateSceneFromState } from './update-scene-from-state';

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
let previousState: State | null = null;
store.subscribe(() => {
  const currentState = store.getState();
  updateSceneFromState(scene, currentState, previousState);
  previousState = currentState;
});

document.getElementById('addPoint').onclick = function() {
  const x = 5 * Math.random();
  const y = 5 * Math.random();
  const z = 5 * Math.random();
  store.dispatch({type: 'ADD_POINT', payload: {x, y, z}});
}

document.getElementById('addManyPoints').onclick = function() {
  store.dispatch({type: 'ADD_MANY_POINTS', payload: {numberOfPoints: 3}});
}

document.getElementById('removePoint').onclick = function() {
  store.dispatch({type: 'REMOVE_ONE_POINT'});
}

document.getElementById('removeAllPoints').onclick = function() {
  store.dispatch({type: 'REMOVE_ALL_POINTS'});
}

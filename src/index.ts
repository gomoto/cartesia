import * as BABYLON from 'babylonjs';
import { createScene } from './create-scene';
import { createStore } from 'redux';
import { reducer } from './reducer';
import * as stateSelector from './selector';
import { State, CartesianPoint } from './state';
import {
  differenceBy as _differenceBy,
  forEach as _forEach,
} from 'lodash';

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
  const currentPoints = stateSelector.getPoints(currentState);
  let enteringPoints: CartesianPoint[];
  let exitingPoints: CartesianPoint[];
  if (!previousState) {
    enteringPoints = currentPoints;
    exitingPoints = [];
  } else {
    const previousPoints = stateSelector.getPoints(previousState);
    enteringPoints = _differenceBy(currentPoints, previousPoints, point => point.id);
    exitingPoints = _differenceBy(previousPoints, currentPoints, point => point.id);
  }
  _forEach(enteringPoints, (point) => {
    const sphere = BABYLON.Mesh.CreateSphere(point.id, 32, 1, scene, false, BABYLON.Mesh.FRONTSIDE);
    sphere.position.x = point.x;
    sphere.position.y = point.y;
    sphere.position.z = point.z;
  });
  _forEach(exitingPoints, (point) => {
    const sphere = scene.getMeshByName(point.id);
    sphere.dispose();
  });
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

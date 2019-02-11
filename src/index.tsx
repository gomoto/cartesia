import * as BABYLON from 'babylonjs';
import { createScene } from './create-scene';
import { createStore, Dispatch } from 'redux';
import { AddPointAction } from './actions';
import { reducer } from './reducer';
import { State } from './state';
import { updateSceneFromState } from './update-scene-from-state';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ControlPanel } from './ControlPanel';
import { connect, Provider } from 'react-redux';
import { createGrid } from './create-grid';
import { createMiscellaneous } from './create-miscellaneous';
import './index.css';

const store = createStore(reducer);

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

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

createGrid(scene);
createMiscellaneous(scene);

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

const mapStateToProps = (state: State) => {
  return {
    points: state.points
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAddPoint: () => {
      const action: AddPointAction = {
        type: 'ADD_POINT',
      };
      dispatch(action);
    },
    onAddManyPoints: () => {
      dispatch({type: 'ADD_MANY_POINTS', payload: {numberOfPoints: 3}});
    },
    onRemovePoint: () => {
      dispatch({type: 'REMOVE_ONE_POINT'});
    },
    onRemoveAllPoints: () => {
      dispatch({type: 'REMOVE_ALL_POINTS'});
    },
  }
};
const ControlPanelContainer = connect(mapStateToProps, mapDispatchToProps)(ControlPanel);

// Application bootstrap
ReactDOM.render((
  <Provider store={store}>
    <ControlPanelContainer />
  </Provider>
), document.getElementById('controlPanel'));

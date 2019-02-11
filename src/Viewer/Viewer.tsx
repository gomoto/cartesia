import * as React from 'react';
import { State } from '../state';
import * as BABYLON from 'babylonjs';
import { createScene } from '../create-scene';
import { createGrid } from '../create-grid';
import { createMiscellaneous } from '../create-miscellaneous';
import { updateSceneFromState } from '../update-scene-from-state';
import './Viewer.css';

export interface ViewerProps {
  previousState: State | null;
  currentState: State;
}

export class Viewer extends React.Component<ViewerProps> {
  private canvas: HTMLCanvasElement | null = null;
  private engine: BABYLON.Engine | null = null;
  private scene: BABYLON.Scene | null = null;

  componentDidMount() {
    // Ref callback is guaranteed to be called before componentDidMount fires.
    // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs

    const enableAntialiasing = true;
    const adaptToDeviceRatio = true;
    const engine = new BABYLON.Engine(
      this.canvas,
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
    engine.runRenderLoop(function() {
      scene.render();
    });

    // Resize the babylon engine when the window is resized
    window.addEventListener('resize', this.onResizeWindow);

    this.engine = engine;
    this.scene = scene;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  // When props update, update scene.
  componentDidUpdate() {
    if (this.scene) {
      updateSceneFromState(this.scene, this.props.currentState, this.props.previousState);
    }
  }

  render() {
    return (
      <div className="Viewer">
        <canvas ref={this.onCanvasRefChange} />
      </div>
    );
  }

  private onCanvasRefChange = (c : HTMLCanvasElement) => {
    if (c !== null) {
      this.canvas = c;
    }
  }

  private onResizeWindow = () => {
    if (this.engine) {
      this.engine.resize();
    }
  }
}

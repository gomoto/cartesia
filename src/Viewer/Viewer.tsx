import * as React from 'react';
import { CartesianObject, CartesianGrid } from '../state';
import * as BABYLON from 'babylonjs';
import { createScene } from './create-scene';
import { createGrid } from './create-grid';
import { createMaterials } from './materials';
import { createMiscellaneous } from './create-miscellaneous';
import './Viewer.css';
import { onMeshClick } from './on-mesh-click';
import { updateObjects } from './update-objects';

export interface ViewerProps {
  currentGrid: CartesianGrid;
  previousGrid: CartesianGrid;
  previousObjects: CartesianObject[];
  currentObjects: CartesianObject[];
  onSelectObject(object: CartesianObject): void;
}

export class Viewer extends React.Component<ViewerProps> {
  private canvas: HTMLCanvasElement | null = null;
  private engine: BABYLON.Engine | null = null;
  private scene: BABYLON.Scene | null = null;
  private gridMesh: BABYLON.LinesMesh | null = null;

  componentDidMount() {
    // Ref callback is guaranteed to be called before componentDidMount fires.
    // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs

    // Create engine
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

    // Create scene
    const scene = createScene(engine);

    createMaterials(scene);
    this.gridMesh = createGrid(scene, this.props.currentGrid);
    createMiscellaneous(scene);
    onMeshClick(scene, (mesh) => {
      const o = this.props.currentObjects.find(o => o.id === mesh.name);
      if (!o) {
        return;
      }
      this.props.onSelectObject(o);
    });

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
      if (this.gridMesh) {
        if (this.props.currentGrid !== this.props.previousGrid) {
          // Recreate grid. Can't get LineSystem updatable to work here. Should it?
          this.gridMesh.dispose();
          this.gridMesh = createGrid(this.scene, this.props.currentGrid);
        }
      }
      if (this.props.currentObjects !== this.props.previousObjects) {
        updateObjects(this.scene, this.props.currentObjects, this.props.previousObjects);
      }
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

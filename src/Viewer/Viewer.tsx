import * as React from 'react';
import { CartesianObject, CartesianGrid, HexColor3 } from '../state';
import * as BABYLON from 'babylonjs';
import { createScene } from './create-scene';
import { createGrid } from './create-grid';
import { createMaterials } from './materials';
import { createMiscellaneous } from './create-miscellaneous';
import './Viewer.css';
import { onMeshClick } from './on-mesh-click';
import { updateObjects } from './update-objects';
import { updateClearColor } from './update-clear-color';
import { updateObjectSelection } from './update-object-selection';

export interface ViewerProps {
  readable: DifferentialProps<ViewerReadableProps>;
  callable: ViewerCallableProps;
}

export interface DifferentialProps<T> {
  previous: T;
  current: T;
}

export interface ViewerReadableProps {
  backgroundColor: HexColor3;
  selectionColor: HexColor3;
  grid: CartesianGrid;
  objects: CartesianObject[];
}

export interface ViewerCallableProps {
  onSelectObject(object: CartesianObject): void;
}

export class Viewer extends React.Component<ViewerProps> {
  private canvas: HTMLCanvasElement | null = null;
  private engine: BABYLON.Engine | null = null;
  private scene: BABYLON.Scene | null = null;
  private gridMesh: BABYLON.LinesMesh | null = null;
  private highlightLayer: BABYLON.HighlightLayer | null = null;

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
    updateClearColor(scene, this.props.readable.current.backgroundColor);
    const highlightLayer = new BABYLON.HighlightLayer('highlight', scene);
    createMaterials(scene);
    const gridMesh = createGrid(scene, this.props.readable.current.grid);
    gridMesh.isPickable = false;
    createMiscellaneous(scene);
    onMeshClick(scene, (mesh) => {
      const o = this.props.readable.current.objects.find(o => o.id === mesh.name);
      if (!o) {
        return;
      }
      this.props.callable.onSelectObject(o);
    });

    // The render loop
    engine.runRenderLoop(function() {
      scene.render();
    });

    // Resize the babylon engine when the window is resized
    window.addEventListener('resize', this.onResizeWindow);

    this.engine = engine;
    this.scene = scene;
    this.gridMesh = gridMesh;
    this.highlightLayer = highlightLayer;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  // When props update, update scene.
  componentDidUpdate() {
    if (this.scene) {
      updateClearColor(this.scene, this.props.readable.current.backgroundColor);
      if (this.gridMesh) {
        if (this.props.readable.current.grid !== this.props.readable.previous.grid) {
          // Recreate grid. Can't get LineSystem updatable to work here. Should it?
          this.gridMesh.dispose();
          this.gridMesh = createGrid(this.scene, this.props.readable.current.grid);
        }
      }
      if (this.props.readable.current.objects !== this.props.readable.previous.objects) {
        updateObjects(this.scene, this.props.readable.current.objects, this.props.readable.previous.objects);
      }
      if (this.props.readable.current.objects !== this.props.readable.previous.objects || this.props.readable.previous.selectionColor !== this.props.readable.current.selectionColor) {
        updateObjectSelection(this.scene, this.highlightLayer!, this.props.readable.current.objects, this.props.readable.current.selectionColor);
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

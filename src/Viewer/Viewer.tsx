import * as React from 'react';
import { BabylonViewer } from './BabylonViewer';
import { ViewerProps } from './ViewerProps';
import { createBabylonViewer } from './create-babylon-viewer';
import { updateBabylonViewer } from './update-babylon-viewer';
import './Viewer.css';

export class Viewer extends React.Component<ViewerProps> {
  private canvas: HTMLCanvasElement | null = null;
  private viewer: BabylonViewer | null = null;

  componentDidMount() {
    // Ref callback is guaranteed to be called before componentDidMount fires.
    // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
    this.viewer = createBabylonViewer(this.canvas!, this.props, {
      onObjectClick: (objectId) => {
        const o = this.props.readable.current.objects.find(o => o.id === objectId);
        if (o) {
          this.props.callable.onSelectObject(o);
        }
      }
    });

    // Resize the babylon engine when the window is resized
    window.addEventListener('resize', this.onResizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  // When props update, update scene.
  componentDidUpdate() {
    // componentDidMount, where viewer is initialized, is
    // guaranteed to be called before componentDidUpdate
    updateBabylonViewer(this.viewer!, this.props);
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
    if (this.viewer) {
      if (this.viewer.engine) {
        this.viewer.engine.resize();
      }
    }
  }
}

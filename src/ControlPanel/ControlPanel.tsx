import * as React from 'react';
import './ControlPanel.css';
import { CartesianObject } from '../state';

export interface ControlPanelProps {
  objects: CartesianObject[];
  onAddPoint(): void;
  onAddManyPoints(): void;
  onRemovePoint(): void;
  onRemoveAllPoints(): void;
}

export class ControlPanel extends React.Component<ControlPanelProps> {
  render() {
    const numberOfPoints = this.props.objects.length;
    return (
      <div className="ControlPanel">
        <div>{numberOfPoints} point{numberOfPoints === 1 ? '' : 's'}</div>
        <button onClick={this.props.onAddPoint.bind(this)}>Add point</button>
        <button onClick={this.props.onAddManyPoints.bind(this)}>Add 3 objects</button>
        <button onClick={this.props.onRemovePoint.bind(this)}>Remove point</button>
        <button onClick={this.props.onRemoveAllPoints.bind(this)}>Remove all objects</button>
      </div>
    );
  }
}

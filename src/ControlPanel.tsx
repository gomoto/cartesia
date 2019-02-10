import * as React from 'react';
import './ControlPanel.css';

export interface ControlPanelProps {
  onAddPoint(): void;
  onAddManyPoints(): void;
  onRemovePoint(): void;
  onRemoveAllPoints(): void;
}

export class ControlPanel extends React.Component<ControlPanelProps> {
  render() {
    return (
      <div className="controlPanel">
        <button onClick={this.props.onAddPoint.bind(this)}>Add point</button>
        <button onClick={this.props.onAddManyPoints.bind(this)}>Add 3 points</button>
        <button onClick={this.props.onRemovePoint.bind(this)}>Remove point</button>
        <button onClick={this.props.onRemoveAllPoints.bind(this)}>Remove all points</button>
      </div>
    );
  }
}

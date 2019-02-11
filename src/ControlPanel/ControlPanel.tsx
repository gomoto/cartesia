import * as React from 'react';
import { List } from 'antd';
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
        <List
          itemLayout="horizontal"
          dataSource={this.props.objects}
          renderItem={(o: CartesianObject) => {
            let objectSpecificContent: React.ReactNode;
            switch (o.objectType) {
              case 'point': {
                objectSpecificContent = (
                  <div>
                    <span>Point</span>
                    <span>{o.position.x}, {o.position.y}, {o.position.z}</span>
                  </div>
                );
                break;
              }
            }
            return (
              <List.Item>
                {objectSpecificContent}
              </List.Item>
            );
          }}
        />
        <button onClick={this.props.onAddPoint.bind(this)}>Add point</button>
        <button onClick={this.props.onAddManyPoints.bind(this)}>Add 3 objects</button>
        <button onClick={this.props.onRemovePoint.bind(this)}>Remove point</button>
        <button onClick={this.props.onRemoveAllPoints.bind(this)}>Remove all objects</button>
      </div>
    );
  }
}

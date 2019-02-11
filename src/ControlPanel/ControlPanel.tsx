import * as React from 'react';
import { Button, Checkbox, List, InputNumber } from 'antd';
import './ControlPanel.css';
import { CartesianObject, Vector3 } from '../state';

export interface ControlPanelProps {
  objects: CartesianObject[];
  onAddPoint(): void;
  onRemoveSelectedObjects(): void;
  onRemoveAllObjects(): void;
  onSelectObject(object: CartesianObject): void;
  onPointPositionChange(object: CartesianObject, position: Vector3): void;
  onUndo(): void;
  onRedo(): void;
  canUndo: boolean;
  canRedo: boolean;
}

export class ControlPanel extends React.Component<ControlPanelProps> {
  render() {
    const numberOfPoints = this.props.objects.length;
    return (
      <div className="ControlPanel">
        <div>{numberOfPoints} object{numberOfPoints === 1 ? '' : 's'}</div>
        <List
          itemLayout="horizontal"
          dataSource={this.props.objects}
          renderItem={(o: CartesianObject) => {
            let displayObjectType: string;
            let objectSpecificContent: React.ReactNode;
            switch (o.objectType) {
              case 'point': {
                displayObjectType = 'Point';
                objectSpecificContent = (
                  <div>
                    <InputNumber value={o.position.x} onChange={(x = 0) => this.props.onPointPositionChange(o, {...o.position, x})} />
                    <InputNumber value={o.position.y} onChange={(y = 0) => this.props.onPointPositionChange(o, {...o.position, y})} />
                    <InputNumber value={o.position.z} onChange={(z = 0) => this.props.onPointPositionChange(o, {...o.position, z})} />
                  </div>
                );
                break;
              }
              default: {
                displayObjectType = '';
                objectSpecificContent = '';
              }
            }
            const checkbox = (
              <Checkbox
                checked={o.isSelected}
                onChange={this.props.onSelectObject.bind(this, o)}
              />
            );
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={checkbox}
                  title={displayObjectType}
                />
                {objectSpecificContent}
              </List.Item>
            );
          }}
        />
        <Button onClick={this.props.onAddPoint.bind(this)}>Add point</Button>
        <Button onClick={this.props.onRemoveSelectedObjects.bind(this)}>Remove selected objects</Button>
        <Button onClick={this.props.onRemoveAllObjects.bind(this)}>Remove all objects</Button>
        <Button onClick={this.props.onUndo.bind(this)} disabled={!this.props.canUndo}>Undo</Button>
        <Button onClick={this.props.onRedo.bind(this)} disabled={!this.props.canRedo}>Redo</Button>
      </div>
    );
  }
}

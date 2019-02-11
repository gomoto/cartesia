import * as React from 'react';
import { Button, Checkbox, Divider, Form, List, Input, InputNumber } from 'antd';
import './ControlPanel.css';
import { CartesianGrid, CartesianObject, Vector3 } from '../state';

export interface ControlPanelProps {
  grid: CartesianGrid;
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
    const labelCol = {
      span: 4,
      offset: 0,
    };
    const wrapperCol = {
      span: 20,
      offset: 0,
    };
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

        <Divider />
        <header>Grid</header>
        <Form>
          <Form.Item label="x" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Input.Group>
              <InputNumber value={this.props.grid.xMin} />
              <InputNumber value={this.props.grid.xMax} />
            </Input.Group>
          </Form.Item>
          <Form.Item label="y" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Input.Group>
              <InputNumber value={this.props.grid.yMin} />
              <InputNumber value={this.props.grid.yMax} />
            </Input.Group>
          </Form.Item>
          <Form.Item label="z" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Input.Group>
              <InputNumber value={this.props.grid.zMin} />
              <InputNumber value={this.props.grid.zMax} />
            </Input.Group>
          </Form.Item>
          <Form.Item label="step" labelCol={labelCol} wrapperCol={wrapperCol}>
            <InputNumber value={this.props.grid.step} />
          </Form.Item>
          <Form.Item label="color" labelCol={labelCol} wrapperCol={wrapperCol}>
            <InputNumber value={this.props.grid.color.r} />
            <InputNumber value={this.props.grid.color.g} />
            <InputNumber value={this.props.grid.color.b} />
          </Form.Item>
        </Form>

      </div>
    );
  }
}

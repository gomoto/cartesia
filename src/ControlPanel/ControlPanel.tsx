import * as React from 'react';
import { Button, Checkbox, Divider, Form, List, Input, InputNumber } from 'antd';
import './ControlPanel.css';
import { CartesianGrid, CartesianObject, Vector3 } from '../state';

export interface ControlPanelProps {
  grid: CartesianGrid;
  onGridChange(grid: CartesianGrid): void;
  objects: CartesianObject[];
  onAddPoint(): void;
  onRemoveSelectedObjects(): void;
  canRemoveSelectedObjects: boolean;
  numberOfSelectedObjects: number;
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
    const numberOfObjects = this.props.objects.length;
    const numberOfSelectedObjects = this.props.numberOfSelectedObjects;
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
        <div>
          <span>{numberOfObjects} object{numberOfObjects === 1 ? '' : 's'}</span>
          <span> / </span>
          <span>{numberOfSelectedObjects} selected</span>
        </div>
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
        <Button onClick={this.props.onRemoveSelectedObjects.bind(this)} disabled={!this.props.canRemoveSelectedObjects}>Remove selected objects</Button>
        <Button onClick={this.props.onRemoveAllObjects.bind(this)}>Remove all objects</Button>
        <Button onClick={this.props.onUndo.bind(this)} disabled={!this.props.canUndo}>Undo</Button>
        <Button onClick={this.props.onRedo.bind(this)} disabled={!this.props.canRedo}>Redo</Button>

        <Divider />
        <header>Grid</header>
        <Form>
          <Form.Item>
            <Checkbox
              checked={this.props.grid.isVisible}
              onChange={() => this.props.onGridChange({...this.props.grid, isVisible: !this.props.grid.isVisible})}
            ></Checkbox>
          </Form.Item>
          <Form.Item label="x" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Input.Group>
              <InputNumber value={this.props.grid.xMin} step={this.props.grid.xStep} max={this.props.grid.xMax} onChange={(xMin = 0) => this.props.onGridChange({...this.props.grid, xMin})}/>
              <InputNumber value={this.props.grid.xMax} step={this.props.grid.xStep} min={this.props.grid.xMin} onChange={(xMax = 0) => this.props.onGridChange({...this.props.grid, xMax})}/>
              <InputNumber value={this.props.grid.xStep} onChange={(xStep = 0) => this.props.onGridChange({...this.props.grid, xStep})}/>
            </Input.Group>
          </Form.Item>
          <Form.Item label="y" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Input.Group>
              <InputNumber value={this.props.grid.yMin} step={this.props.grid.yStep} max={this.props.grid.yMax} onChange={(yMin = 0) => this.props.onGridChange({...this.props.grid, yMin})}/>
              <InputNumber value={this.props.grid.yMax} step={this.props.grid.yStep} min={this.props.grid.yMin} onChange={(yMax = 0) => this.props.onGridChange({...this.props.grid, yMax})}/>
              <InputNumber value={this.props.grid.yStep} onChange={(yStep = 0) => this.props.onGridChange({...this.props.grid, yStep})}/>
            </Input.Group>
          </Form.Item>
          <Form.Item label="z" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Input.Group>
              <InputNumber value={this.props.grid.zMin} step={this.props.grid.zStep} max={this.props.grid.zMax} onChange={(zMin = 0) => this.props.onGridChange({...this.props.grid, zMin})}/>
              <InputNumber value={this.props.grid.zMax} step={this.props.grid.zStep} min={this.props.grid.zMin} onChange={(zMax = 0) => this.props.onGridChange({...this.props.grid, zMax})}/>
              <InputNumber value={this.props.grid.zStep} onChange={(zStep = 0) => this.props.onGridChange({...this.props.grid, zStep})}/>
            </Input.Group>
          </Form.Item>
          <Form.Item label="color" labelCol={labelCol} wrapperCol={wrapperCol}>
            <InputNumber value={this.props.grid.color.r} min={0} max={1} step={.1} onChange={(r = 1) => this.props.onGridChange({...this.props.grid, color: {...this.props.grid.color, r}})}/>
            <InputNumber value={this.props.grid.color.g} min={0} max={1} step={.1} onChange={(g = 1) => this.props.onGridChange({...this.props.grid, color: {...this.props.grid.color, g}})}/>
            <InputNumber value={this.props.grid.color.b} min={0} max={1} step={.1} onChange={(b = 1) => this.props.onGridChange({...this.props.grid, color: {...this.props.grid.color, b}})}/>
          </Form.Item>
        </Form>

      </div>
    );
  }
}

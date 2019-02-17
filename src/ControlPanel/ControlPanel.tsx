import * as React from 'react';
import { Checkbox, Divider, Form, List, Input, InputNumber } from 'antd';
import './ControlPanel.css';
import { CartesianGrid, CartesianObject, Vector3, HexColor3 } from '../state';

const ColorPicker = require('rc-color-picker');
import 'rc-color-picker/assets/index.css';

export interface ControlPanelProps {
  backgroundColor: HexColor3;
  onBackgroundColorChange(color: HexColor3): void;
  selectionColor: HexColor3;
  onSelectionColorChange(color: HexColor3): void;
  grid: CartesianGrid;
  onGridChange(grid: CartesianGrid): void;
  objects: CartesianObject[];
  numberOfSelectedObjects: number;
  onSelectObject(object: CartesianObject): void;
  onPointPositionChange(object: CartesianObject, position: Vector3): void;
}

export class ControlPanel extends React.Component<ControlPanelProps> {
  render() {
    const numberOfObjects = this.props.objects.length;
    const numberOfSelectedObjects = this.props.numberOfSelectedObjects;
    const labelCol = {
      span: 10,
      offset: 0,
    };
    const wrapperCol = {
      span: 14,
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

        <Divider />

        <Form>
          <Form.Item label="Background color" labelCol={labelCol} wrapperCol={wrapperCol}>
            <div className="ControlPanel-ColorPicker-container">
              <ColorPicker
                animation="slide-up"
                color={this.props.backgroundColor}
                enableAlpha={false}
                onChange={(event: {color: HexColor3}) => {
                  // Color picker sometimes fires despite unchanged color
                  if (event.color !== this.props.backgroundColor) {
                    this.props.onBackgroundColorChange(event.color);
                  }
                }}
              />
            </div>
          </Form.Item>
          <Form.Item label="Selection color" labelCol={labelCol} wrapperCol={wrapperCol}>
            <div className="ControlPanel-ColorPicker-container">
              <ColorPicker
                animation="slide-up"
                color={this.props.selectionColor}
                enableAlpha={false}
                onChange={(event: {color: HexColor3}) => {
                  // Color picker sometimes fires despite unchanged color
                  if (event.color !== this.props.selectionColor) {
                    this.props.onSelectionColorChange(event.color);
                  }
                }}
              />
            </div>
          </Form.Item>
        </Form>

        <header>Grid</header>
        <Form>
          <Form.Item label="Visibility" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Checkbox
              checked={this.props.grid.isVisible}
              onChange={() => this.props.onGridChange({...this.props.grid, isVisible: !this.props.grid.isVisible})}
            ></Checkbox>
          </Form.Item>
          <Form.Item label="x min/max" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Input.Group>
              <InputNumber value={this.props.grid.xMin} step={this.props.grid.xStepMinor} max={this.props.grid.xMax} onChange={(xMin = 0) => this.props.onGridChange({...this.props.grid, xMin})}/>
              <InputNumber value={this.props.grid.xMax} step={this.props.grid.xStepMinor} min={this.props.grid.xMin} onChange={(xMax = 0) => this.props.onGridChange({...this.props.grid, xMax})}/>
            </Input.Group>
          </Form.Item>
          <Form.Item label="x step minor/major" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Input.Group>
              <InputNumber value={this.props.grid.xStepMinor} onChange={(xStepMinor = 0) => this.props.onGridChange({...this.props.grid, xStepMinor})}/>
              <InputNumber value={this.props.grid.xStepMajor} onChange={(xStepMajor = 0) => this.props.onGridChange({...this.props.grid, xStepMajor})}/>
            </Input.Group>
          </Form.Item>
          <Form.Item label="y min/max" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Input.Group>
              <InputNumber value={this.props.grid.yMin} step={this.props.grid.yStepMinor} max={this.props.grid.yMax} onChange={(yMin = 0) => this.props.onGridChange({...this.props.grid, yMin})}/>
              <InputNumber value={this.props.grid.yMax} step={this.props.grid.yStepMinor} min={this.props.grid.yMin} onChange={(yMax = 0) => this.props.onGridChange({...this.props.grid, yMax})}/>
            </Input.Group>
          </Form.Item>
          <Form.Item label="y step minor/major" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Input.Group>
              <InputNumber value={this.props.grid.yStepMinor} onChange={(yStepMinor = 0) => this.props.onGridChange({...this.props.grid, yStepMinor})}/>
              <InputNumber value={this.props.grid.yStepMajor} onChange={(yStepMajor = 0) => this.props.onGridChange({...this.props.grid, yStepMajor})}/>
            </Input.Group>
          </Form.Item>
          <Form.Item label="z min/max" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Input.Group>
              <InputNumber value={this.props.grid.zMin} step={this.props.grid.zStepMinor} max={this.props.grid.zMax} onChange={(zMin = 0) => this.props.onGridChange({...this.props.grid, zMin})}/>
              <InputNumber value={this.props.grid.zMax} step={this.props.grid.zStepMinor} min={this.props.grid.zMin} onChange={(zMax = 0) => this.props.onGridChange({...this.props.grid, zMax})}/>
            </Input.Group>
          </Form.Item>
          <Form.Item label="z step minor/major" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Input.Group>
              <InputNumber value={this.props.grid.zStepMinor} onChange={(zStepMinor = 0) => this.props.onGridChange({...this.props.grid, zStepMinor})}/>
              <InputNumber value={this.props.grid.zStepMajor} onChange={(zStepMajor = 0) => this.props.onGridChange({...this.props.grid, zStepMajor})}/>
            </Input.Group>
          </Form.Item>
          <Form.Item label="Minor color" labelCol={labelCol} wrapperCol={wrapperCol}>
            <div className="ControlPanel-ColorPicker-container">
              <ColorPicker
                animation="slide-up"
                color={this.props.grid.colorMinor}
                enableAlpha={false}
                onChange={(event: {color: HexColor3}) => {
                  // Color picker sometimes fires despite unchanged color
                  if (event.color !== this.props.grid.colorMinor) {
                    this.props.onGridChange({...this.props.grid, colorMinor: event.color});
                  }
                }}
              />
            </div>
          </Form.Item>
          <Form.Item label="Major color" labelCol={labelCol} wrapperCol={wrapperCol}>
            <div className="ControlPanel-ColorPicker-container">
              <ColorPicker
                animation="slide-up"
                color={this.props.grid.colorMajor}
                enableAlpha={false}
                onChange={(event: {color: HexColor3}) => {
                  // Color picker sometimes fires despite unchanged color
                  if (event.color !== this.props.grid.colorMajor) {
                    this.props.onGridChange({...this.props.grid, colorMajor: event.color});
                  }
                }}
              />
            </div>
          </Form.Item>
        </Form>

      </div>
    );
  }
}

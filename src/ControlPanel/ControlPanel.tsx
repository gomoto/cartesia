import * as React from 'react';
import { Checkbox, Divider, Form, List, Input, InputNumber } from 'antd';
import './ControlPanel.css';
import { CartesianGrid, CartesianObject, Vector3, HexColor3 } from '../state';

const ColorPicker = require('rc-color-picker');
import 'rc-color-picker/assets/index.css';

export type ControlPanelProps = ControlPanelReadableProps & ControlPanelCallableProps;

export interface ControlPanelReadableProps {
  backgroundColor: HexColor3;
  selectionColor: HexColor3;
  grid: CartesianGrid;
  objects: CartesianObject[];
  numberOfSelectedObjects: number;
}

export interface ControlPanelCallableProps {
  onBackgroundColorChange(color: HexColor3): void;
  onSelectionColorChange(color: HexColor3): void;
  onGridChange(grid: CartesianGrid): void;
  onSelectObject(object: CartesianObject): void;
  onSpherePositionChange(object: CartesianObject, position: Vector3): void;
  onSphereScalingChange(object: CartesianObject, scaling: Vector3): void;
  onChangeSphereIsScalingProportional(object: CartesianObject, isScalingProportional: boolean): void;
  onChangeObjectColor(object: CartesianObject, color: HexColor3): void;
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
              case 'sphere': {
                displayObjectType = 'Sphere';
                objectSpecificContent = (
                  <Form>
                    <Form.Item label="Position">
                      <InputNumber value={o.position.x} onChange={(x = 0) => this.props.onSpherePositionChange(o, {...o.position, x})} />
                      <InputNumber value={o.position.y} onChange={(y = 0) => this.props.onSpherePositionChange(o, {...o.position, y})} />
                      <InputNumber value={o.position.z} onChange={(z = 0) => this.props.onSpherePositionChange(o, {...o.position, z})} />
                    </Form.Item>
                    <Form.Item label="Scaling">
                      <InputNumber value={o.scaling.x} onChange={(x = 0) => {
                        if (o.isScalingProportional) {
                          const relativeScaling = x / o.scaling.x;
                          this.props.onSphereScalingChange(o, {
                            x,
                            y: o.scaling.y * relativeScaling,
                            z: o.scaling.z * relativeScaling,
                          });
                          return;
                        }
                        this.props.onSphereScalingChange(o, {...o.scaling, x});
                      }} />
                      <InputNumber value={o.scaling.y} onChange={(y = 0) => {
                        if (o.isScalingProportional) {
                          const relativeScaling = y / o.scaling.y;
                          this.props.onSphereScalingChange(o, {
                            x: o.scaling.x * relativeScaling,
                            y,
                            z: o.scaling.z * relativeScaling,
                          });
                          return;
                        }
                        this.props.onSphereScalingChange(o, {...o.scaling, y});
                      }} />
                      <InputNumber value={o.scaling.z} onChange={(z = 0) => {
                        if (o.isScalingProportional) {
                          const relativeScaling = z / o.scaling.z;
                          this.props.onSphereScalingChange(o, {
                            x: o.scaling.x * relativeScaling,
                            y: o.scaling.y * relativeScaling,
                            z,
                          });
                          return;
                        }
                        this.props.onSphereScalingChange(o, {...o.scaling, z});
                      }} />
                    </Form.Item>
                    <Form.Item label="Proportional scaling">
                      <Checkbox
                        checked={o.isScalingProportional}
                        onChange={() => this.props.onChangeSphereIsScalingProportional(o, !o.isScalingProportional)}
                      />
                    </Form.Item>
                    <Form.Item label="Color">
                      <div className="ControlPanel-ColorPicker-container">
                        <ColorPicker
                          animation="slide-up"
                          color={o.color}
                          enableAlpha={false}
                          onChange={(event: {color: HexColor3}) => {
                            // Color picker sometimes fires despite unchanged color
                            if (event.color !== this.props.backgroundColor) {
                              this.props.onChangeObjectColor(o, event.color);
                            }
                          }}
                        />
                      </div>
                    </Form.Item>
                  </Form>
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

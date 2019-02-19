import * as React from 'react';
import { Button, Checkbox, Form, List, InputNumber, Tooltip } from 'antd';
import { CartesianObject, Vector3, HexColor3, CartesianLine } from '../state';
import { computeLineLength } from './compute-line-length';
import { copyToClipboard } from '../util/copy-to-clipboard';
import './ObjectCatalog.css';

const ColorPicker = require('rc-color-picker');
import 'rc-color-picker/assets/index.css';
import { InputPaste } from '../InputPaste/InputPaste';

export type ObjectCatalogProps = ObjectCatalogReadableProps & ObjectCatalogCallableProps;

export interface ObjectCatalogReadableProps {
  objects: CartesianObject[];
  numberOfSelectedObjects: number;
}

export interface ObjectCatalogCallableProps {
  onSelectObject(object: CartesianObject): void;
  onSpherePositionChange(object: CartesianObject, position: Vector3): void;
  onSphereScalingChange(object: CartesianObject, scaling: Vector3): void;
  onChangeSphereIsScalingProportional(object: CartesianObject, isScalingProportional: boolean): void;
  onChangeObjectColor(object: CartesianObject, color: HexColor3): void;
  onChangeLineStart(line: CartesianLine, start: Vector3): void;
  onChangeLineEnd(line: CartesianLine, end: Vector3): void;
}

export class ObjectCatalog extends React.Component<ObjectCatalogProps> {
  render() {
    const numberOfObjects = this.props.objects.length;
    const numberOfSelectedObjects = this.props.numberOfSelectedObjects;
    return (
      <div className="ObjectCatalog">
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
                      <Tooltip placement="top" title="Copy">
                        <Button icon="copy" onClick={() => copyToClipboard({type: 'Vector3', data: o.position})} />
                      </Tooltip>
                      <Tooltip placement="top" title="Paste">
                        {/* Look into why extra element needed to trigger tooltip */}
                        <span>
                          <InputPaste onPaste={(content) => console.log(content)} />
                        </span>
                      </Tooltip>
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
                      <div className="ColorPicker-container">
                        <ColorPicker
                          animation="slide-up"
                          color={o.color}
                          enableAlpha={false}
                          onChange={(event: {color: HexColor3}) => {
                            // Color picker sometimes fires despite unchanged color
                            if (event.color !== o.color) {
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
              case 'line': {
                displayObjectType = 'Line';
                objectSpecificContent = (
                  <Form>
                    <Form.Item label="Start">
                      <InputNumber value={o.start.x} onChange={(x = 0) => this.props.onChangeLineStart(o, {...o.start, x})} />
                      <InputNumber value={o.start.y} onChange={(y = 0) => this.props.onChangeLineStart(o, {...o.start, y})} />
                      <InputNumber value={o.start.z} onChange={(z = 0) => this.props.onChangeLineStart(o, {...o.start, z})} />
                      <Tooltip placement="top" title="Copy">
                        <Button icon="copy" onClick={() => copyToClipboard({type: 'Vector3', data: o.start})} />
                      </Tooltip>
                    </Form.Item>
                    <Form.Item label="End">
                      <InputNumber value={o.end.x} onChange={(x = 0) => this.props.onChangeLineEnd(o, {...o.end, x})} />
                      <InputNumber value={o.end.y} onChange={(y = 0) => this.props.onChangeLineEnd(o, {...o.end, y})} />
                      <InputNumber value={o.end.z} onChange={(z = 0) => this.props.onChangeLineEnd(o, {...o.end, z})} />
                      <Tooltip placement="top" title="Copy">
                        <Button icon="copy" onClick={() => copyToClipboard({type: 'Vector3', data: o.end})} />
                      </Tooltip>
                    </Form.Item>
                    <Form.Item label="Color">
                      <div className="ColorPicker-container">
                        <ColorPicker
                          animation="slide-up"
                          color={o.color}
                          enableAlpha={false}
                          onChange={(event: {color: HexColor3}) => {
                            // Color picker sometimes fires despite unchanged color
                            if (event.color !== o.color) {
                              this.props.onChangeObjectColor(o, event.color);
                            }
                          }}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item label="Length">
                      <span>{computeLineLength(o)}</span>
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
      </div>
    );
  }
}

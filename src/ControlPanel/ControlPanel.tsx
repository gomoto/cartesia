import * as React from 'react';
import { Divider } from 'antd';
import './ControlPanel.css';
import { CartesianGrid, CartesianObject, Vector3, HexColor3 } from '../state';
import { ObjectCatalog } from '../ObjectCatalog/ObjectCatalog';
import { PreferenceCatalog } from '../PreferenceCatalog/PreferenceCatalog';

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
    return (
      <div className="ControlPanel">
        <ObjectCatalog {...this.props} />
        <Divider />
        <PreferenceCatalog {...this.props} />
      </div>
    );
  }
}

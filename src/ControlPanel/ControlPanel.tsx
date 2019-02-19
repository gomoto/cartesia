import * as React from 'react';
import './ControlPanel.css';
import { CartesianGrid, CartesianObject, Vector3, HexColor3, CartesianLine } from '../state';
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
  onChangeLineStart(line: CartesianLine, start: Vector3): void;
  onChangeLineEnd(line: CartesianLine, end: Vector3): void;
}

// Maintain internal state for now
interface ControlPanelState {
  activeTabType: ControlPanelTabType;
}

type ControlPanelTabType = 'objects' | 'preferences';

export class ControlPanel extends React.Component<ControlPanelProps, ControlPanelState> {
  state: ControlPanelState;

  constructor(props: ControlPanelProps) {
    super(props);
    this.state = {
      activeTabType: 'objects',
    };
  }

  private getContent(): React.ReactNode {
    switch (this.state.activeTabType) {
      case 'objects': {
        return <ObjectCatalog {...this.props} />;
      }
      case 'preferences': {
        return <PreferenceCatalog {...this.props} />;
      }
    }
  }

  private setActiveTabType(tabType: ControlPanelTabType): void {
    this.setState({
      ...this.state,
      activeTabType: tabType,
    });
  }

  render() {
    return (
      <div className="ControlPanel">
        <nav className="ControlPanel-tabs">
          <div
            className={`ControlPanel-tab ${this.state.activeTabType === 'objects' && 'ControlPanel-active-tab'}`}
            onClick={this.setActiveTabType.bind(this, 'objects')}>
            <span>Objects</span>
          </div>
          <div
            className={`ControlPanel-tab ${this.state.activeTabType === 'preferences' && 'ControlPanel-active-tab'}`}
            onClick={this.setActiveTabType.bind(this, 'preferences')}>
            <span>Preferences</span>
          </div>
        </nav>
        <div className="ControlPanel-content">
          {this.getContent()}
        </div>
      </div>
    );
  }
}

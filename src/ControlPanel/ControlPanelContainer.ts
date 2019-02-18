import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, CartesianObject, Vector3, CartesianGrid, HexColor3 } from '../state';
import { ControlPanel, ControlPanelReadableProps, ControlPanelCallableProps } from './ControlPanel';
import { SelectObjectAction, UnselectObjectAction, ChangeSpherePositionAction, ChangeGridAction, ChangeBackgroundColorAction, ChangeSelectionColorAction, ChangeSphereScalingAction, ChangeSphereIsScalingProportionalAction } from '../actions';
import { StateWithHistory } from 'redux-undo';
import { countSelectedObjects } from '../selector';

const mapStateToProps = (state: StateWithHistory<State>): ControlPanelReadableProps => {
  return {
    backgroundColor: state.present.backgroundColor,
    selectionColor: state.present.selectionColor,
    grid: state.present.grid,
    objects: state.present.objects,
    numberOfSelectedObjects: countSelectedObjects(state.present),
  };
};
const mapDispatchToProps = (dispatch: Dispatch): ControlPanelCallableProps => {
  return {
    onBackgroundColorChange: (color: HexColor3) => {
      dispatch<ChangeBackgroundColorAction>({
        type: 'CHANGE_BACKGROUND_COLOR',
        payload: { color },
      });
    },
    onSelectionColorChange: (color: HexColor3) => {
      dispatch<ChangeSelectionColorAction>({
        type: 'CHANGE_SELECTION_COLOR',
        payload: { color },
      });
    },
    onGridChange: (grid: CartesianGrid) => {
      dispatch<ChangeGridAction>({
        type: 'CHANGE_GRID',
        payload: {grid},
      });
    },
    onSelectObject: (o: CartesianObject) => {
      if (o.isSelected) {
        dispatch<UnselectObjectAction>({
          type: 'UNSELECT_OBJECT',
          payload: {objectId: o.id},
        });
      } else {
        dispatch<SelectObjectAction>({
          type: 'SELECT_OBJECT',
          payload: {objectId: o.id},
        });
      }
    },
    onSpherePositionChange: (o: CartesianObject, position: Vector3) => {
      dispatch<ChangeSpherePositionAction>({
        type: 'CHANGE_SPHERE_POSITION',
        payload: {objectId: o.id, position},
      });
    },
    onSphereScalingChange: (o: CartesianObject, scaling: Vector3) => {
      dispatch<ChangeSphereScalingAction>({
        type: 'CHANGE_SPHERE_SCALING',
        payload: {objectId: o.id, scaling},
      });
    },
    onChangeSphereIsScalingProportional: (o: CartesianObject, isScalingProportional: boolean) => {
      dispatch<ChangeSphereIsScalingProportionalAction>({
        type: 'CHANGE_SPHERE_IS_SCALING_PROPORTIONAL',
        payload: {objectId: o.id, isScalingProportional},
      });
    },
  }
};

export const ControlPanelContainer = connect(mapStateToProps, mapDispatchToProps)(ControlPanel);

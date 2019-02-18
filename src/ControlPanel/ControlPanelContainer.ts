import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, CartesianObject, Vector3, CartesianGrid, HexColor3 } from '../state';
import { ControlPanel } from './ControlPanel';
import { AddSphereAction, SelectObjectAction, UnselectObjectAction, ChangeSpherePositionAction, ChangeGridAction, ChangeBackgroundColorAction, ChangeSelectionColorAction, ChangeSphereScalingAction } from '../actions';
import { StateWithHistory, ActionTypes as ReduxUndoActionTypes } from 'redux-undo';
import { countSelectedObjects } from '../selector';

const mapStateToProps = (state: StateWithHistory<State>) => {
  return {
    backgroundColor: state.present.backgroundColor,
    selectionColor: state.present.selectionColor,
    grid: state.present.grid,
    objects: state.present.objects,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    canRemoveSelectedObjects: countSelectedObjects(state.present) > 0,
    numberOfSelectedObjects: countSelectedObjects(state.present),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
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
      const action: ChangeGridAction = {
        type: 'CHANGE_GRID',
        payload: {grid},
      };
      dispatch(action);
    },
    onAddSphere: () => {
      const action: AddSphereAction = {
        type: 'ADD_SPHERE',
      };
      dispatch(action);
    },
    onRemoveSelectedObjects: () => {
      dispatch({type: 'REMOVE_SELECTED_OBJECTS'});
    },
    onRemoveAllObjects: () => {
      dispatch({type: 'REMOVE_ALL_OBJECTS'});
    },
    onSelectObject: (o: CartesianObject) => {
      if (o.isSelected) {
        const action: UnselectObjectAction = {
          type: 'UNSELECT_OBJECT',
          payload: {objectId: o.id},
        };
        dispatch(action);
      } else {
        const action: SelectObjectAction = {
          type: 'SELECT_OBJECT',
          payload: {objectId: o.id},
        };
        dispatch(action);
      }
    },
    onSpherePositionChange: (o: CartesianObject, position: Vector3) => {
      const action: ChangeSpherePositionAction = {
        type: 'CHANGE_SPHERE_POSITION',
        payload: {objectId: o.id, position},
      };
      dispatch(action);
    },
    onSphereScalingChange: (o: CartesianObject, scaling: Vector3) => {
      const action: ChangeSphereScalingAction = {
        type: 'CHANGE_SPHERE_SCALING',
        payload: {objectId: o.id, scaling},
      };
      dispatch(action);
    },
    onUndo: () => {
      dispatch({type: ReduxUndoActionTypes.UNDO});
    },
    onRedo: () => {
      dispatch({type: ReduxUndoActionTypes.REDO});
    },
  }
};

export const ControlPanelContainer = connect(mapStateToProps, mapDispatchToProps)(ControlPanel);

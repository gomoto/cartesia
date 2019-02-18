import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, CartesianObject, Vector3, CartesianGrid, HexColor3 } from '../state';
import { ControlPanel } from './ControlPanel';
import { AddSphereAction, SelectObjectAction, UnselectObjectAction, ChangeSpherePositionAction, ChangeGridAction, ChangeBackgroundColorAction, ChangeSelectionColorAction, ChangeSphereScalingAction, RemoveSelectedObjectsAction, RemoveAllObjectsAction } from '../actions';
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
      dispatch<ChangeGridAction>({
        type: 'CHANGE_GRID',
        payload: {grid},
      });
    },
    onAddSphere: () => {
      dispatch<AddSphereAction>({
        type: 'ADD_SPHERE',
      });
    },
    onRemoveSelectedObjects: () => {
      dispatch<RemoveSelectedObjectsAction>({type: 'REMOVE_SELECTED_OBJECTS'});
    },
    onRemoveAllObjects: () => {
      dispatch<RemoveAllObjectsAction>({type: 'REMOVE_ALL_OBJECTS'});
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
    onUndo: () => {
      dispatch({type: ReduxUndoActionTypes.UNDO});
    },
    onRedo: () => {
      dispatch({type: ReduxUndoActionTypes.REDO});
    },
  }
};

export const ControlPanelContainer = connect(mapStateToProps, mapDispatchToProps)(ControlPanel);

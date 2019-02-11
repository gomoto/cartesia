import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, CartesianObject, Vector3 } from '../state';
import { ControlPanel } from './ControlPanel';
import { AddPointAction, SelectObjectAction, UnselectObjectAction, ChangePointPositionAction } from '../actions';
import { StateWithHistory, ActionTypes as ReduxUndoActionTypes } from 'redux-undo';

const mapStateToProps = (state: StateWithHistory<State>) => {
  return {
    grid: state.present.grid,
    objects: state.present.objects,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAddPoint: () => {
      const action: AddPointAction = {
        type: 'ADD_POINT',
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
    onPointPositionChange: (o: CartesianObject, position: Vector3) => {
      const action: ChangePointPositionAction = {
        type: 'CHANGE_POINT_POSITION',
        payload: {objectId: o.id, position},
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

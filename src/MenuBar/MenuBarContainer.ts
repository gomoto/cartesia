import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../state';
import { MenuBar } from './MenuBar';
import { AddSphereAction, RemoveSelectedObjectsAction, RemoveAllObjectsAction, AddLineAction } from '../actions';
import { StateWithHistory, ActionTypes as ReduxUndoActionTypes } from 'redux-undo';
import { countObjects, countSelectedObjects } from '../selector';

const mapStateToProps = (state: StateWithHistory<State>) => {
  return {
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    canRemoveAllObjects: countObjects(state.present) > 0,
    canRemoveSelectedObjects: countSelectedObjects(state.present) > 0,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAddSphere: () => {
      dispatch<AddSphereAction>({type: 'ADD_SPHERE'});
    },
    onAddLine: () => {
      dispatch<AddLineAction>({type: 'ADD_LINE'});
    },
    onRemoveSelectedObjects: () => {
      dispatch<RemoveSelectedObjectsAction>({type: 'REMOVE_SELECTED_OBJECTS'});
    },
    onRemoveAllObjects: () => {
      dispatch<RemoveAllObjectsAction>({type: 'REMOVE_ALL_OBJECTS'});
    },
    onUndo: () => {
      dispatch({type: ReduxUndoActionTypes.UNDO});
    },
    onRedo: () => {
      dispatch({type: ReduxUndoActionTypes.REDO});
    },
  }
};

export const MenuBarContainer = connect(mapStateToProps, mapDispatchToProps)(MenuBar);

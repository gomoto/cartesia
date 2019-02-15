import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../state';
import { MenuBar } from './MenuBar';
import { AddPointAction, RemoveSelectedObjectsAction, RemoveAllObjects } from '../actions';
import { StateWithHistory, ActionTypes as ReduxUndoActionTypes } from 'redux-undo';
import { countSelectedObjects } from '../selector';

const mapStateToProps = (state: StateWithHistory<State>) => {
  return {
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    canRemoveSelectedObjects: countSelectedObjects(state.present) > 0,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAddPoint: () => {
      dispatch<AddPointAction>({type: 'ADD_POINT'});
    },
    onRemoveSelectedObjects: () => {
      dispatch<RemoveSelectedObjectsAction>({type: 'REMOVE_SELECTED_OBJECTS'});
    },
    onRemoveAllObjects: () => {
      dispatch<RemoveAllObjects>({type: 'REMOVE_ALL_OBJECTS'});
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

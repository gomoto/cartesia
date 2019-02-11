import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, CartesianObject } from '../state';
import { SelectObjectAction, UnselectObjectAction } from '../actions';
import { Viewer } from './Viewer';
import { StateWithHistory } from 'redux-undo';

// Track previous state
let _previousState: StateWithHistory<State> | null = null;
const mapStateToProps = (state: StateWithHistory<State>) => {
  const grid = state.present.grid;
  const currentObjects = state.present.objects;
  const previousObjects = _previousState ? _previousState.present.objects : []; // use saved previous state
  _previousState = state; // save previous state for next call
  return {
    grid,
    currentObjects,
    previousObjects,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
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
  }
};

export const ViewerContainer = connect(mapStateToProps, mapDispatchToProps)(Viewer);

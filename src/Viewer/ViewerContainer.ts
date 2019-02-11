import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, CartesianObject } from '../state';
import { SelectObjectAction, UnselectObjectAction } from '../actions';
import { Viewer } from './Viewer';

// Track previous state
let _previousState: State | null = null;
const mapStateToProps = (state: State) => {
  const currentObjects = state.objects;
  const previousObjects = _previousState ? _previousState.objects : []; // use saved previous state
  _previousState = state; // save previous state for next call
  return {
    previousObjects,
    currentObjects,
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

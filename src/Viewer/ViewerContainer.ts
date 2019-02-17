import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, CartesianObject } from '../state';
import { SelectObjectAction, UnselectObjectAction } from '../actions';
import { Viewer } from './Viewer';
import { ViewerReadableProps, ViewerCallableProps, DifferentialProps } from './ViewerProps';
import { StateWithHistory } from 'redux-undo';

// Track previous state
let _previousState: StateWithHistory<State> | null = null;
const mapStateToProps = (state: StateWithHistory<State>) => {
  const previousState = _previousState; // capture previous state
  _previousState = state; // save previous state for next call
  return { readable: getReadableProps(state, previousState) };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { callable: getCallableProps(dispatch) }
};

function getReadableProps(currentState:StateWithHistory<State>, previousState: StateWithHistory<State> | null): DifferentialProps<ViewerReadableProps> {
  return {
    previous: getReadablePropsFromState(previousState || currentState),
    current: getReadablePropsFromState(currentState),
  };
}

function getCallableProps(dispatch: Dispatch): ViewerCallableProps {
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
  };
}

function getReadablePropsFromState(state: StateWithHistory<State>): ViewerReadableProps {
  const backgroundColor = state.present.backgroundColor;
  const selectionColor = state.present.selectionColor;
  const grid = state.present.grid;
  const objects = state.present.objects;
  return {
    backgroundColor,
    selectionColor,
    grid,
    objects,
  }
}

export const ViewerContainer = connect(mapStateToProps, mapDispatchToProps)(Viewer);

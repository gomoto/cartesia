import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from './state';
import { Viewer } from './Viewer';

// Track previous state
let _previousState: State | null = null;
const mapStateToProps = (state: State) => {
  const currentState = state;
  const previousState = _previousState; // use saved previous state
  _previousState = state; // save previous state for next call
  return {
    previousState,
    currentState,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  }
};



export const ViewerContainer = connect(mapStateToProps, mapDispatchToProps)(Viewer);

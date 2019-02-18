import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, CartesianObject } from '../state';
import { SelectObjectAction, UnselectObjectAction } from '../actions';
import { Viewer } from './Viewer';
import { ViewerReadableProps, ViewerCallableProps } from './ViewerProps';
import { StateWithHistory } from 'redux-undo';

const mapStateToProps = (state: StateWithHistory<State>) => {
  return { readable: getReadableProps(state) };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { callable: getCallableProps(dispatch) }
};

function getReadableProps(state: StateWithHistory<State>): ViewerReadableProps {
  const backgroundColor = state.present.backgroundColor;
  const selectionColor = state.present.selectionColor;
  const grid = state.present.grid;
  const objects = state.present.objects;
  return {
    backgroundColor,
    selectionColor,
    grid,
    objects,
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

export const ViewerContainer = connect(mapStateToProps, mapDispatchToProps)(Viewer);

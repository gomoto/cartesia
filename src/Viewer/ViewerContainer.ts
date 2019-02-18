import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, CartesianObject } from '../state';
import { SelectObjectAction, UnselectObjectAction } from '../actions';
import { Viewer } from './Viewer';
import { ViewerReadableProps, ViewerCallableProps } from './Viewer';
import { StateWithHistory } from 'redux-undo';

const mapStateToProps = (state: StateWithHistory<State>): ViewerReadableProps => {
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
};

const mapDispatchToProps = (dispatch: Dispatch): ViewerCallableProps => {
  return {
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
  };
};

export const ViewerContainer = connect(mapStateToProps, mapDispatchToProps)(Viewer);

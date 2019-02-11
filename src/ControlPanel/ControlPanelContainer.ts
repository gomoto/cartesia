import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../state';
import { ControlPanel } from './ControlPanel';
import { AddPointAction, SelectObjectAction } from '../actions';

const mapStateToProps = (state: State) => {
  return {
    objects: state.objects
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
    onAddManyPoints: () => {
      dispatch({type: 'ADD_MANY_POINTS', payload: {numberOfPoints: 3}});
    },
    onRemovePoint: () => {
      dispatch({type: 'REMOVE_ONE_POINT'});
    },
    onRemoveAllPoints: () => {
      dispatch({type: 'REMOVE_ALL_POINTS'});
    },
    onSelectObject: (objectId: string) => {
      const action: SelectObjectAction = {
        type: 'SELECT_OBJECT',
        payload: {objectId},
      };
      dispatch(action);
    },
  }
};

export const ControlPanelContainer = connect(mapStateToProps, mapDispatchToProps)(ControlPanel);

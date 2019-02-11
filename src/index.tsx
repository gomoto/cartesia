import { createStore, Dispatch } from 'redux';
import { AddPointAction } from './actions';
import { reducer } from './reducer';
import { State } from './state';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ControlPanel } from './ControlPanel';
import { ViewerContainer } from './ViewerContainer';
import { connect, Provider } from 'react-redux';
import './index.css';

const store = createStore(reducer);

const mapStateToProps = (state: State) => {
  return {
    points: state.points
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
  }
};
const ControlPanelContainer = connect(mapStateToProps, mapDispatchToProps)(ControlPanel);

// Application bootstrap
ReactDOM.render((
  <Provider store={store}>
    <ControlPanelContainer />
    <ViewerContainer />
  </Provider>
), document.getElementById('root'));

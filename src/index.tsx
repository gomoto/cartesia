import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import undoable, { ActionCreators as ReduxUndoActionCreators } from 'redux-undo';
import { reducer } from './reducer';
import { Provider } from 'react-redux';
import { ControlPanelContainer } from './ControlPanel/ControlPanelContainer';
import { ViewerContainer } from './Viewer/ViewerContainer';
import mousetrap from 'mousetrap';
import './index.css';
import { RemoveSelectedObjectsAction } from './actions';

const store = createStore(undoable(reducer));

mousetrap.bind(['backspace', 'del'], () => {
  store.dispatch<RemoveSelectedObjectsAction>({type: 'REMOVE_SELECTED_OBJECTS'})
});
mousetrap.bind('mod+z', () => {
  store.dispatch(ReduxUndoActionCreators.undo());
});
mousetrap.bind('shift+mod+z', () => {
  store.dispatch(ReduxUndoActionCreators.redo());
});

ReactDOM.render((
  <Provider store={store}>
    <ControlPanelContainer />
    <ViewerContainer />
  </Provider>
), document.getElementById('root'));

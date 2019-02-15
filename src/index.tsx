import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import undoable, { ActionCreators as ReduxUndoActionCreators } from 'redux-undo';
import { reducer } from './reducer';
import { Provider } from 'react-redux';
import { ControlPanelContainer } from './ControlPanel/ControlPanelContainer';
import { MenuBar } from './MenuBar/MenuBar';
import { ViewerContainer } from './Viewer/ViewerContainer';
import mousetrap from 'mousetrap';
import { RemoveSelectedObjectsAction, TranslateSelectedObjectsAction } from './actions';
import './index.css';

const store = createStore(undoable(reducer));

mousetrap.bind(['backspace', 'del'], () => {
  store.dispatch<RemoveSelectedObjectsAction>({
    type: 'REMOVE_SELECTED_OBJECTS'
  });
});
mousetrap.bind('mod+z', () => {
  store.dispatch(ReduxUndoActionCreators.undo());
});
mousetrap.bind('shift+mod+z', () => {
  store.dispatch(ReduxUndoActionCreators.redo());
});
mousetrap.bind('option+left', () => {
  store.dispatch<TranslateSelectedObjectsAction>({
    type: 'TRANSLATE_SELECTED_OBJECTS',
    payload: { dx: -1 }
  });
});
mousetrap.bind('option+right', () => {
  store.dispatch<TranslateSelectedObjectsAction>({
    type: 'TRANSLATE_SELECTED_OBJECTS',
    payload: { dx: 1 }
  });
});
mousetrap.bind('option+down', () => {
  store.dispatch<TranslateSelectedObjectsAction>({
    type: 'TRANSLATE_SELECTED_OBJECTS',
    payload: { dy: -1 }
  });
});
mousetrap.bind('option+up', () => {
  store.dispatch<TranslateSelectedObjectsAction>({
    type: 'TRANSLATE_SELECTED_OBJECTS',
    payload: { dy: 1 }
  });
});
mousetrap.bind('option+-', () => {
  store.dispatch<TranslateSelectedObjectsAction>({
    type: 'TRANSLATE_SELECTED_OBJECTS',
    payload: { dz: -1 }
  });
});
mousetrap.bind(['option+plus', 'option+='], () => {
  store.dispatch<TranslateSelectedObjectsAction>({
    type: 'TRANSLATE_SELECTED_OBJECTS',
    payload: { dz: 1 }
  });
});

ReactDOM.render((
  <Provider store={store}>
    <div className="MenuBarContainer">
      <MenuBar />
    </div>
    <div className="viewport">
      <div className="ControlPanelContainer">
        <ControlPanelContainer />
      </div>
      <div className="ViewerContainer">
        <ViewerContainer />
      </div>
    </div>
  </Provider>
), document.getElementById('root'));

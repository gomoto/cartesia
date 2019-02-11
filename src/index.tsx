import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { reducer } from './reducer';
import { Provider } from 'react-redux';
import { ControlPanelContainer } from './ControlPanelContainer';
import { ViewerContainer } from './ViewerContainer';
import './index.css';

const store = createStore(reducer);

ReactDOM.render((
  <Provider store={store}>
    <ControlPanelContainer />
    <ViewerContainer />
  </Provider>
), document.getElementById('root'));

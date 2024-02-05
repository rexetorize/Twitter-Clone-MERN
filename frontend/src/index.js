import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import authStore from './AuthRedux/AuthStore';


ReactDOM.render(

    <Provider store={authStore}>
      <App />
    </Provider>,
  document.getElementById('root')
);


import React from 'react';
import './App.css';

import {Provider} from 'react-redux';

import configureStore from '../../store/configureStore';

import Router from '../Router';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      
      <Router />
      </Provider>
    );
  }
}

export default App;

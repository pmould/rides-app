import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import {routerMiddleware} from 'react-router-redux';

import history from '../history';
const sagaMiddleware = createSagaMiddleware();

export default (initialState) => {
  const store = {
    ...createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk, promiseMiddleware(), sagaMiddleware, routerMiddleware(history)),
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : f => f
      )
    ),
    history: history
  };
  sagaMiddleware.run(rootSaga);

  return store;
}
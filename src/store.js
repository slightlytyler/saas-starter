import { compose, identity } from 'lodash/fp';
import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import { middleware as sagaMiddleware } from './sagas';

const devTools = (
  __DEV__ && window.devToolsExtension
    ? window.devToolsExtension()
    : identity
);

const store = compose(
  applyMiddleware(sagaMiddleware),
  devTools,
)(createStore)(reducer);

export default store;

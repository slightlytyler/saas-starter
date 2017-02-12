import { connectRouter, routerMiddleware } from 'connected-react-router';
import { compose, identity } from 'lodash/fp';
import { applyMiddleware, combineReducers, createStore as createReduxStore } from 'redux';

const createStore = ({ history, reducers }) => {
  const devTools = (
    __DEV__ && window.devToolsExtension
      ? window.devToolsExtension()
      : identity
  );
  const rootReducer = compose(
    connectRouter(history),
    combineReducers,
  )(reducers);
  return compose(
    applyMiddleware(routerMiddleware(history)),
    devTools,
  )(createReduxStore)(rootReducer);
};

export default createStore;

import { compose, identity } from 'lodash/fp';
import { applyMiddleware, createStore as createReduxStore } from 'redux';

const devTools = (
  __DEV__ && window.devToolsExtension
    ? window.devToolsExtension()
    : identity
);

const createStore = ({ middleware, reducer }) => (
 compose(applyMiddleware(...middleware), devTools)(createReduxStore)(reducer)
);

export default createStore;

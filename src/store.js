import { connectRouter, routerMiddleware } from 'connected-react-router';
import { assign, compose, identity } from 'lodash/fp';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import {
  createLoader as createStorageLoader,
  createMiddleware as createStorageMiddleware,
  reducer as storageWrapper,
} from 'redux-storage';
import filterStorageEngine from 'redux-storage-decorator-filter';
import createStorageEngine from 'redux-storage-engine-localstorage';
import { LOCAL_STORAGE_KEY } from 'src/config';
import reducers from './reducers';
import { middleware as sagaMiddleware } from './sagas';

const devTools = (
  __DEV__ && window.devToolsExtension
    ? window.devToolsExtension()
    : identity
);

const storageEngine = filterStorageEngine(createStorageEngine(LOCAL_STORAGE_KEY), ['auth']);

const storageMiddleware = createStorageMiddleware(
  storageEngine,
  [],
  [
    '@@auth/LOGIN/succeed',
    '@@auth/LOGOUT/succeed',
    '@@auth/SIGN_UP/succeed',
  ],
);

export default ({ history }) => {
  const makeRootReducer = compose(connectRouter(history), storageWrapper, combineReducers);
  const store = compose(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      storageMiddleware,
    ),
    devTools,
  )(createStore)(makeRootReducer(reducers));
  store.asyncReducers = {};
  store.addAsyncReducer = ({ key, reducer }) => Object.assign(
    store.asyncReducers,
    { [key]: reducer },
  );
  store.injectReducer = compose(
    store.replaceReducer,
    makeRootReducer,
    assign(reducers),
    store.addAsyncReducer,
  );
  store.loadStorage = () => createStorageLoader(storageEngine)(store);

  return store;
};

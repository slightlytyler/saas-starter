import { connectRouter, routerMiddleware } from 'connected-react-router';
import { compose, identity } from 'lodash/fp';
import { applyMiddleware, createStore } from 'redux';
import {
  createLoader as createStorageLoader,
  createMiddleware as createStorageMiddleware,
} from 'redux-storage';
import filterStorageEngine from 'redux-storage-decorator-filter';
import createStorageEngine from 'redux-storage-engine-localstorage';
import { LOCAL_STORAGE_KEY } from 'src/config';
import reducer from './reducer';
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
  const store = compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware, storageMiddleware),
    devTools,
  )(createStore)(connectRouter(history)(reducer));

  store.dispatch({ type: '@@app/STORAGE_WILL_LOAD' });

  createStorageLoader(storageEngine)(store).then(() => store.dispatch({
    type: '@@app/STORAGE_DID_LOAD',
  }));

  return store;
};

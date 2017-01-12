import { connectRouter, routerMiddleware } from 'connected-react-router';
import { assign, compose, identity, map, values } from 'lodash/fp';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import {
  createLoader as createStorageLoader,
  createMiddleware as createStorageMiddleware,
  reducer as storageWrapper,
} from 'redux-storage';
import filterStorageEngine from 'redux-storage-decorator-filter';
import createStorageEngine from 'redux-storage-engine-localstorage';
import { LOCAL_STORAGE_KEY } from 'src/config';
import reducers from './reducers';
import sagas from './sagas';

export default ({ history }) => {
  const devTools = (
    __DEV__ && window.devToolsExtension
      ? window.devToolsExtension()
      : identity
  );
  const sagaMiddleware = createSagaMiddleware();
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
  const makeRootReducer = compose(connectRouter(history), storageWrapper, combineReducers);
  const makeRootSaga = s => function* rootSaga() {
    yield compose(map(fork), values)(s);
  };
  const store = compose(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      storageMiddleware,
    ),
    devTools,
  )(createStore)(makeRootReducer(reducers));
  // eslint-disable-next-line lodash-fp/no-unused-result
  compose(sagaMiddleware.run, makeRootSaga)(sagas);
  store.loadStorage = () => createStorageLoader(storageEngine)(store);
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
  store.asyncSagas = {};
  store.addAsyncSaga = ({ key, saga }) => Object.assign(
    store.asyncSagas,
    { [key]: saga },
  );
  store.injectSaga = compose(
    sagaMiddleware.run,
    makeRootSaga,
    assign(sagas),
    store.addAsyncSaga,
  );

  return store;
};

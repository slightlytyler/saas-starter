import { compose, map, values } from 'lodash/fp';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';

export const middleware = createSagaMiddleware();

const asyncSagas = {};

const makeRootSaga = () => function* rootSaga() {
  yield compose(map(fork), values)(asyncSagas);
};

const applyAsyncSagas = compose(middleware.run, makeRootSaga);

export const injectSaga = ({ key, sagas }) => {
  asyncSagas[key] = sagas;
  applyAsyncSagas();
};

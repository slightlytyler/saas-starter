import { compose } from 'lodash/fp';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { rest } from 'src/http';
import * as actions from './actions';

export function* createRecord({ meta, payload }) {
  try {
    const { body } = yield rest.post({
      body: payload,
      endpoint: '/goals',
    });
    yield compose(put, actions.createRecord.succeed)(body);
    yield call(meta.callback);
  } catch (e) {
    yield compose(put, actions.createRecord.fail)(e.toString());
  }
}

export function* fetchCollection({ payload }) {
  try {
    const response = yield rest.get({
      endpoint: '/goals',
      params: payload.params,
    });
    const { body } = response;
    yield compose(put, actions.fetchCollection.succeed)({
      ...body,
      params: payload.params,
    });
  } catch (e) {
    yield compose(put, actions.fetchCollection.fail)(e.toString());
  }
}

export default function* sagas() {
  yield [
    takeLatest(actions.createRecord.types.initiate, createRecord),
    takeLatest(actions.fetchCollection.types.initiate, fetchCollection),
  ];
}

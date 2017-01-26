import { push, replace } from 'connected-react-router';
import { compose } from 'lodash/fp';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { rest } from 'src/http';
import * as actions from './actions';

export function* createRecord({ payload }) {
  try {
    const { body } = yield call(rest.post, {
      body: payload,
      endpoint: '/adapters',
    });
    yield compose(put, actions.createRecord.succeed)(body);
    yield compose(put, replace)(`/adapters/${body.id}/general`);
    yield compose(put, push)(`/adapters/${body.id}/operations`);
  } catch (e) {
    yield compose(put, actions.createRecord.fail)(e.toString());
  }
}

export function* deleteRecord({ payload }) {
  try {
    const { body } = yield call(rest.delete, {
      endpoint: `/adapters/${payload.id}`,
    });
    yield compose(put, actions.deleteRecord.succeed)(body);
  } catch (e) {
    yield compose(put, actions.deleteRecord.fail)(e.toString());
  }
}

export function* fetchCollection({ payload }) {
  try {
    const { body } = yield call(rest.get, {
      endpoint: '/adapters',
      query: payload.query,
    });
    yield compose(put, actions.fetchCollection.succeed)({
      query: payload.query,
      ...body,
    });
  } catch (e) {
    yield compose(put, actions.fetchCollection.fail)(e.toString());
  }
}

export function* fetchRecord({ payload }) {
  try {
    const { body } = yield call(rest.get, {
      endpoint: `/adapters/${payload.id}`,
    });
    yield compose(put, actions.fetchRecord.succeed)(body);
  } catch (e) {
    yield compose(put, actions.fetchRecord.fail)(e.toString());
  }
}

export function* updateRecord({ payload }) {
  try {
    const { body } = yield call(rest.patch, {
      body: payload,
      endpoint: `/adapters/${payload.id}`,
    });
    yield compose(put, actions.updateRecord.succeed)(body);
  } catch (e) {
    yield compose(put, actions.updateRecord.fail)(e.toString());
  }
}

export default function* sagas() {
  yield [
    takeLatest(actions.createRecord.types.initiate, createRecord),
    takeLatest(actions.deleteRecord.types.initiate, deleteRecord),
    takeLatest(actions.fetchCollection.types.initiate, fetchCollection),
    takeLatest(actions.fetchRecord.types.initiate, fetchRecord),
    takeLatest(actions.updateRecord.types.initiate, updateRecord),
  ];
}

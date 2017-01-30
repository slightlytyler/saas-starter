import { push, replace } from 'connected-react-router';
import { compose } from 'lodash/fp';
import * as dialogsSagas from 'common/modules/dialogs/sagas';
import { takeLatest } from 'redux-saga';
import { call, cancelled, put, select } from 'redux-saga/effects';
import generateId from 'shortid';
import { rest } from 'src/http';
import * as actions from './actions';
import { selectRecordById } from './selectors';

export function* createRecord({ payload }) {
  try {
    const { body } = yield call(rest.post, {
      body: payload,
      endpoint: '/adapters',
    });
    yield compose(put, actions.createRecord.succeed)(body);
    yield compose(put, replace)(`/adapters/${body.id}`);
    yield compose(put, push)(`/adapters/${body.id}/operations`);
  } catch (e) {
    yield compose(put, actions.createRecord.fail)({
      ...payload,
      reason: e.toString(),
    });
  } finally {
    if (yield cancelled()) {
      yield compose(put, actions.createRecord.cancel)(payload);
    }
  }
}

export function* deleteRecord({ payload, meta: { transactionId } }) {
  try {
    const state = yield select();
    const record = selectRecordById(state, payload.id);
    const { confirm, deny } = yield call(dialogsSagas.prompt, {
      id: generateId(),
      message: `Deleting ${record.body.name} will effect the routes that depend on it.`,
      title: 'Are you sure?',
    });
    if (confirm) {
      yield call(rest.delete, { endpoint: `/adapters/${payload.id}` });
      yield compose(
        put,
        actions.deleteRecord.succeed(transactionId),
      )(payload);
    }
    if (deny) {
      yield compose(
        put,
        actions.deleteRecord.cancel(transactionId),
      )(payload);
    }
  } catch (e) {
    yield compose(
      put,
      actions.deleteRecord.fail(transactionId),
    )({
      ...payload,
      reason: e.toString(),
    });
  } finally {
    if (yield cancelled()) {
      yield compose(
        put,
        actions.deleteRecord.cancel(transactionId),
      )(payload);
    }
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
    yield compose(put, actions.fetchCollection.fail)({
      ...payload,
      reason: e.toString(),
    });
  } finally {
    if (yield cancelled()) {
      yield compose(put, actions.fetchCollection.cancel)(payload);
    }
  }
}

export function* fetchRecord({ payload, meta: { transactionId } }) {
  try {
    const { body } = yield call(rest.get, { endpoint: `/adapters/${payload.id}` });
    yield compose(
      put,
      actions.fetchRecord.succeed(transactionId),
    )(body);
  } catch (e) {
    yield compose(
      put,
      actions.fetchRecord.fail(transactionId),
    )({
      ...payload,
      reason: e.toString(),
    });
  } finally {
    if (yield cancelled()) {
      yield compose(
        put,
        actions.fetchRecord.cancel(transactionId),
      )(payload);
    }
  }
}

export function* updateRecord({ payload, meta: { transactionId } }) {
  try {
    const { body } = yield call(rest.patch, {
      body: payload,
      endpoint: `/adapters/${payload.id}`,
    });
    yield compose(
      put,
      actions.updateRecord.succeed(transactionId),
    )(body);
  } catch (e) {
    yield compose(
      put,
      actions.updateRecord.fail(transactionId),
    )({
      ...payload,
      reason: e.toString(),
    });
  } finally {
    if (yield cancelled()) {
      yield compose(
        put,
        actions.updateRecord.cancel(transactionId),
      )(payload);
    }
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

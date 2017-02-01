import * as dialogsSagas from 'common/modules/dialogs/sagas';
import * as toastsActions from 'common/modules/toasts/actions';
import fetchSaga from 'common/sagas/fetch';
import { compose } from 'lodash/fp';
import { takeLatest } from 'redux-saga';
import { call, cancelled, put, select } from 'redux-saga/effects';
import * as actions from './actions';
import { selectRecordById } from './selectors';

export function* createRecord({ payload, meta: { callback } }) {
  try {
    const { body } = yield call(fetchSaga, {
      body: payload,
      endpoint: '/adapters',
      method: 'POST',
    });
    yield compose(put, actions.createRecord.succeed)(body);
    yield call(callback, body);
  } catch (e) {
    yield compose(put, actions.createRecord.fail)({
      ...payload,
      reason: e.toString(),
    });
    yield compose(put, toastsActions.add)({
      message: `Create ${payload.name} failed.`,
      type: 'failure',
    });
  } finally {
    if (yield cancelled()) {
      yield compose(put, actions.createRecord.cancel)(payload);
    }
  }
}

export function* deleteRecord({ payload, meta: { transactionId } }) {
  const state = yield select();
  const record = selectRecordById(state, payload.id);
  try {
    const { confirm, deny } = yield call(dialogsSagas.prompt, {
      message: `Deleting ${record.body.name} will effect the routes that depend on it.`,
      title: 'Are you sure?',
    });
    if (confirm) {
      yield call(fetchSaga, {
        endpoint: `/adapters/${payload.id}`,
        method: 'DELETE',
      });
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
    yield compose(put, toastsActions.add)({
      message: `Delete ${record.name} failed.`,
      type: 'failure',
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
    const { body } = yield call(fetchSaga, {
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
    yield compose(put, toastsActions.add)({
      message: 'Fetch adapter collection failed.',
      type: 'failure',
    });
  } finally {
    if (yield cancelled()) {
      yield compose(put, actions.fetchCollection.cancel)(payload);
    }
  }
}

export function* fetchRecord({ payload, meta: { transactionId } }) {
  try {
    const { body } = yield call(fetchSaga, { endpoint: `/adapters/${payload.id}` });
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
    yield compose(put, toastsActions.add)({
      message: `Fetch adapter ${payload.id} failed.`,
      type: 'failure',
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
    const { body } = yield call(fetchSaga, {
      body: payload,
      endpoint: `/adapters/${payload.id}`,
      method: 'PATCH',
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
    yield compose(put, toastsActions.add)({
      message: `Update ${payload.name} failed.`,
      type: 'failure',
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

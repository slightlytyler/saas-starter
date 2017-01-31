import { rest } from 'common/http';
import * as toastsActions from 'common/modules/toasts/actions';
import { compose } from 'lodash/fp';
import { takeLatest } from 'redux-saga';
import { call, cancelled, fork, put } from 'redux-saga/effects';
import * as actions from './actions';

export function* fetchCollection({ payload }) {
  try {
    const { body } = yield call(rest.get, {
      endpoint: '/users',
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
      message: 'Fetch user collection failed.',
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
    const { body } = yield call(rest.get, { endpoint: `/users/${payload.id}` });
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
      message: `Fetch user ${payload.id} failed.`,
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

export function* sendInvite({ payload }) {
  try {
    const { body } = yield call(rest.post, {
      body: payload,
      endpoint: 'users/invite',
    });
    yield compose(put, actions.resendInvite.succeed)(body);
  } catch (e) {
    yield compose(put, actions.resendInvite.fail)({
      ...payload,
      reason: e.toString(),
    });
  } finally {
    if (yield cancelled()) {
      yield compose(put, actions.resendInvite.cancel)(payload);
    }
  }
}

export function* resendInvite(action) {
  yield fork(sendInvite, action);
}

export default function* sagas() {
  yield [
    takeLatest(actions.fetchCollection.types.initiate, fetchCollection),
    takeLatest(actions.fetchRecord.types.initiate, fetchRecord),
    takeLatest(actions.resendInvite.types.initiate, resendInvite),
    takeLatest(actions.sendInvite.types.initiate, sendInvite),
  ];
}

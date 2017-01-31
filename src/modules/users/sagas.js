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

export function* invite(actionCreator, { payload }) {
  try {
    const { body } = yield call(rest.post, {
      body: payload,
      endpoint: 'users/invite',
    });
    yield compose(put, actionCreator.succeed)(body);
    yield compose(put, toastsActions.add)({
      message: `Invite sent to ${body.email}.`,
    });
  } catch (e) {
    yield compose(put, actionCreator.fail)({
      ...payload,
      reason: e.toString(),
    });
    yield compose(put, toastsActions.add)({
      message: 'Invite failed to send.',
      type: 'failure',
    });
  } finally {
    if (yield cancelled()) {
      yield compose(put, actionCreator.cancel)(payload);
    }
  }
}

export function* resendInvite(action) {
  yield fork(invite, actions.resendInvite, action);
}

export function* sendInvite(action) {
  yield fork(invite, actions.sendInvite, action);
}

export default function* sagas() {
  yield [
    takeLatest(actions.fetchCollection.types.initiate, fetchCollection),
    takeLatest(actions.fetchRecord.types.initiate, fetchRecord),
    takeLatest(actions.resendInvite.types.initiate, resendInvite),
    takeLatest(actions.sendInvite.types.initiate, sendInvite),
  ];
}

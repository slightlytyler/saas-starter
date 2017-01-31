import { rest } from 'common/http';
import { push } from 'connected-react-router';
import { compose } from 'lodash/fp';
import { takeEvery, takeLatest } from 'redux-saga';
import { call, cancelled, fork, put } from 'redux-saga/effects';
import * as actions from './actions';

export function* authenticate({ payload, meta }, actionCreator, restCall) {
  try {
    const { body, headers } = yield restCall;
    const token = rest.selectToken(headers);
    yield compose(put, actionCreator.succeed)({
      token,
      user: body,
    });
    yield compose(put, actions.registerToken)({ token });
    yield compose(put, push)('/');
  } catch (e) {
    yield compose(put, actionCreator.fail)({
      ...payload,
      reason: e.toString(),
    });
    yield call(meta.callback);
  } finally {
    if (yield cancelled()) {
      yield compose(put, actionCreator.cancel)(payload);
    }
  }
}

export function* deregisterToken() {
  yield call(rest.deregisterToken);
}

export function* login(action) {
  yield fork(
    authenticate,
    action,
    actions.login,
    call(rest.post, {
      body: action.payload,
      endpoint: '/users/login',
    }),
  );
}

export function* logout() {
  yield compose(put, actions.deregisterToken)();
  yield compose(put, push)('/auth/login');
}

export function* registerToken({ payload }) {
  yield call(rest.registerToken, payload.token);
}

export function* signUp(action) {
  yield fork(
    authenticate,
    action,
    actions.signUp,
    call(rest.post, {
      body: action.payload,
      endpoint: '/users/sign-up',
    }),
  );
}

export default function* sagas() {
  yield [
    takeEvery(actions.deregisterToken.type, deregisterToken),
    takeLatest(actions.login.types.initiate, login),
    takeLatest(actions.logout.type, logout),
    takeEvery(actions.registerToken.type, registerToken),
    takeLatest(actions.signUp.types.initiate, signUp),
  ];
}

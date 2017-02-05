import * as toastsActions from 'common/modules/toasts/actions';
import fetchSaga from 'common/sagas/fetch';
import { push } from 'connected-react-router';
import { compose } from 'lodash/fp';
import { takeLatest } from 'redux-saga';
import { call, cancelled, fork, put } from 'redux-saga/effects';
import { LOCAL_STORAGE_AUTH_KEY } from 'src/config';
import * as actions from './actions';

export function* authenticate({ payload, meta }, actionCreator, fetchOptions) {
  try {
    const { body, token } = yield call(fetchSaga, fetchOptions);
    yield compose(put, actionCreator.succeed)({
      token,
      user: body,
    });
    yield compose(put, push)('/');
  } catch (e) {
    yield call(meta.callback);
    yield compose(put, actionCreator.fail)({
      ...payload,
      reason: e.toString(),
    });
    yield compose(put, toastsActions.add)({
      message: e.toString(),
      type: 'failure',
    });
  } finally {
    if (yield cancelled()) {
      yield call(meta.callback);
      yield compose(put, actionCreator.cancel)(payload);
    }
  }
}

export function* changePassword({ payload, meta }) {
  try {
    yield call(fetchSaga, {
      body: payload,
      endpoint: '/users/password-reset',
      method: 'POST',
    });
    yield compose(put, actions.changePassword.succeed)({ payload });
    yield compose(put, push)('/auth/login');
  } catch (e) {
    yield call(meta.callback);
    yield compose(put, actions.changePassword.fail)({
      ...payload,
      reason: e.toString(),
    });
    yield compose(put, toastsActions.add)({
      message: e.toString(),
      type: 'failure',
    });
  } finally {
    if (yield cancelled()) {
      yield call(meta.callback);
      yield compose(put, actions.changePassword.cancel)({ payload });
    }
  }
}

export function* login(action) {
  yield fork(
    authenticate,
    action,
    actions.login,
    {
      body: action.payload,
      endpoint: '/users/login',
      method: 'POST',
    },
  );
}

export function* logout() {
  window.localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  yield compose(put, push)('/');
  location.reload();
}

export function* resetPassword({ payload, meta }) {
  try {
    yield call(fetchSaga, {
      body: payload,
      endpoint: '/users/password-reset',
      method: 'POST',
    });
    yield compose(put, actions.resetPassword.succeed)({ payload });
  } catch (e) {
    yield call(meta.callback);
    yield compose(put, actions.resetPassword.fail)({
      ...payload,
      reason: e.toString(),
    });
    yield compose(put, toastsActions.add)({
      message: e.toString(),
      type: 'failure',
    });
  } finally {
    if (yield cancelled()) {
      yield call(meta.callback);
      yield compose(put, actions.resetPassword.cancel)({ payload });
    }
  }
}

export function* signUp(action) {
  yield fork(
    authenticate,
    action,
    actions.signUp,
    {
      body: action.payload,
      endpoint: '/users/sign-up',
      method: 'POST',
    },
  );
}

export default function* sagas() {
  yield [
    takeLatest(actions.changePassword.types.initiate, changePassword),
    takeLatest(actions.login.types.initiate, login),
    takeLatest(actions.logout.type, logout),
    takeLatest(actions.resetPassword.types.initiate, resetPassword),
    takeLatest(actions.signUp.types.initiate, signUp),
  ];
}

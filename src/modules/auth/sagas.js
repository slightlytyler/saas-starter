import { push } from 'connected-react-router';
import { compose } from 'lodash/fp';
import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { rest } from 'src/http';
import * as actions from './actions';

export function* deregisterToken() {
  yield call(rest.deregisterToken);
}

export function* login({ payload, meta }) {
  try {
    const { body, headers } = yield call(rest.post, {
      body: payload,
      endpoint: '/users/login',
    });
    const token = rest.selectToken(headers);
    yield compose(put, actions.login.succeed)({
      token,
      user: body,
    });
    yield compose(put, actions.registerToken)({ token });
    yield compose(put, push)('/adapters');
  } catch (e) {
    yield compose(put, actions.login.fail)(e.toString());
    yield call(meta.callback);
  }
}

export function* logout() {
  yield compose(put, actions.deregisterToken)();
  yield compose(put, push)('/auth/login');
}

export function* registerToken({ payload }) {
  yield call(rest.registerToken, payload.token);
}

export default function* sagas() {
  yield [
    takeEvery(actions.deregisterToken.type, deregisterToken),
    takeLatest(actions.login.types.initiate, login),
    takeLatest(actions.logout.type, logout),
    takeEvery(actions.registerToken.type, registerToken),
  ];
}

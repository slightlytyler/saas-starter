import { push } from 'connected-react-router';
import { compose } from 'lodash/fp';
import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { rest } from 'src/http';
import * as actions from './actions';
import { selectToken } from './selectors';

export function* deregisterToken() {
  yield call(rest.deregisterToken);
}

export function* login({ payload }) {
  try {
    const { body, headers } = yield call(rest.post, {
      body: payload,
      endpoint: '/users/login',
    });
    yield compose(put, actions.login.succeed)({
      token: rest.selectToken(headers),
      user: body,
    });
    yield compose(put, actions.registerToken)();
    yield compose(put, push)('/adapters');
  } catch (e) {
    yield compose(put, actions.login.fail)(e.toString());
  }
}

export function* logout() {
  yield compose(put, actions.deregisterToken)();
}

export function* registerToken() {
  const state = yield select();
  yield call(compose(rest.registerToken, selectToken), state);
}

export default function* sagas() {
  yield [
    takeLatest(actions.login.types.initiate, login),
    takeEvery(actions.registerToken.type, registerToken),
  ];
}

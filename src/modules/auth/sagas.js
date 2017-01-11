import { compose } from 'lodash/fp';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { rest } from 'src/http';
import * as actions from './actions';

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
  } catch (e) {
    yield compose(put, actions.login.fail)(e.toString());
  }
}
export default function* sagas() {
  yield [
    takeLatest(actions.login.types.initiate, login),
  ];
}

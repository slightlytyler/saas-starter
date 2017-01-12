import { compose } from 'lodash/fp';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { rest } from 'src/http';
import * as actions from './actions';

export function* fetchCollection({ payload }) {
  try {
    const { body } = yield call(rest.get, {
      endpoint: '/adapters',
      query: payload.query,
    });
    yield compose(put, actions.fetchCollection.succeed)(body);
  } catch (e) {
    yield compose(put, actions.fetchCollection.fail)(e.toString());
  }
}

export default function* sagas() {
  yield [
    takeLatest(actions.fetchCollection.types.initiate, fetchCollection),
  ];
}

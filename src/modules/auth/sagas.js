import { takeLatest } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { LOCAL_STORAGE_AUTH_KEY } from 'src/config';
import * as actions from './actions';

export function* logout() {
  yield call([window.localStorage, window.localStorage.removeItem], LOCAL_STORAGE_AUTH_KEY);
  yield call([location, location.reload]);
}

export default function* sagas() {
  yield [
    takeLatest(actions.logout.type, logout),
  ];
}

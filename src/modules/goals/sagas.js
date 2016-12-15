import path from 'path';
import { compose } from 'lodash/fp';
import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import qs from 'qs';
import * as actions from './actions';

const scheme = 'https';

const host = 'dacdobzxf3.execute-api.us-west-2.amazonaws.com';

const basePath = 'dev';

const createUrl = (pathname, params) => {
  const url = `${scheme}://${path.join(host, basePath, pathname)}`;
  if (params) return `${url}?${qs.stringify(params)}`;
  return url;
};

export function* createRecord({ payload }) {
  try {
    const response = yield fetch(createUrl('/goals', payload.params), {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    });
    const body = yield response.json();
    yield compose(put, actions.createRecord.succeed)(body);
  } catch (e) {
    yield compose(put, actions.createRecord.fail)(e.toString());
  }
}

export function* fetchCollection({ payload }) {
  try {
    const response = yield fetch(createUrl('/goals', payload.params));
    const body = yield response.json();
    yield compose(put, actions.fetchCollection.succeed)({
      ...body,
      params: payload.params,
    });
  } catch (e) {
    yield compose(put, actions.fetchCollection.fail)(e.toString());
  }
}

export default function* sagas() {
  yield [
    takeLatest(actions.createRecord.types.INITIATED, createRecord),
    takeLatest(actions.fetchCollection.types.INITIATED, fetchCollection),
  ];
}

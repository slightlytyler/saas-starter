import createFetch from 'common/http/createFetch';
import { compose } from 'lodash/fp';
import * as authActions from 'modules/auth/actions';
import * as authSelectors from 'modules/auth/selectors';
import { call, put, select } from 'redux-saga/effects';

export default function* fetch(options) {
  const response = yield call(createFetch, {
    ...options,
    token: authSelectors.selectToken(yield select()),
  });
  if (!response.ok) {
    switch (response.status) {
      case 401: {
        yield compose(put, authActions.logout)('/');
        throw new Error(response.statusText);
      }

      default:
        throw new Error(response.statusText);
    }
  }
  return response;
}

import { get } from 'lodash/fp';
import _createAction from 'common/actions/createAction';
import { name } from './config';

const createAction = _createAction(name);

export const createRecord = createAction({
  type: 'CREATE_RECORD',
  creator: {
    initiate: type => (data, callback) => ({
      type,
      payload: data,
      meta: { callback },
    }),
    succeed: type => data => ({
      type,
      payload: data,
    }),
    fail: type => data => ({
      type,
      payload: data,
    }),
    cancel: type => data => ({
      type,
      payload: data,
    }),
  },
});

export const fetchCollection = createAction({
  type: 'FETCH_COLLECTION',
  creator: {
    initiate: type => data => ({
      type,
      payload: {
        query: get('query', data) || {},
      },
    }),
    succeed: type => data => ({
      type,
      payload: data,
    }),
    fail: type => data => ({
      type,
      payload: data,
    }),
    cancel: type => data => ({
      type,
      payload: data,
    }),
  },
});

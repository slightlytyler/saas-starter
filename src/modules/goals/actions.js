import { get } from 'lodash/fp';
import _createAction from 'common/actions/createAction';

const createAction = _createAction('goals');

export const createRecord = createAction({
  type: 'CREATE_RECORD',
  creator: {
    initiate: type => data => ({
      type,
      payload: data,
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
        params: get('params', data) || {},
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

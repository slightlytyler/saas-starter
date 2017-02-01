import { get } from 'lodash/fp';

const generateFetchCollection = createAction => createAction({
  type: 'FETCH_COLLECTION',
  creator: {
    initiate: type => (data, callback) => ({
      type,
      payload: {
        query: get('query', data) || {},
      },
      meta: callback ? { callback } : undefined,
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

export default generateFetchCollection;

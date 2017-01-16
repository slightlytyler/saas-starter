import queryKey from 'common/data/queryKey';
import { get, has, map } from 'lodash/fp';

const selectRecordId = get('id');

const selectRecordsIds = map(selectRecordId);

const hasCollectionForQuery = (state, query) => has(queryKey(query), state);

const collectionDefaults = {
  ids: [],
  pagination: {
    totalElements: 0,
    totalPages: 0,
  },
};

const createCollection = (state, query) => ({
  ...state,
  [queryKey(query)]: {
    ...collectionDefaults,
    loading: true,
    query,
    timestamp: new Date().toString(),
  },
});

const updateCollection = (state, query, collection) => {
  const key = queryKey(queryKey);
  return {
    ...state,
    [key]: {
      ...state[key],
      ...collection,
      timestamp: new Date().toString(),
    },
  };
};

const createCollectionsReducer = actions => (state = {}, { type, payload }) => {
  switch (type) {
    case actions.fetchCollection.types.initiate: {
      if (hasCollectionForQuery(state, payload.query)) {
        return updateCollection(state, payload.query, { loading: true });
      }
      return createCollection(state, payload.query);
    }

    case actions.fetchCollection.types.succeed:
      return updateCollection(state, payload.query, {
        ids: selectRecordsIds(payload.records),
        loading: false,
        pagination: payload.pagination,
      });

    default:
      return state;
  }
};
export default createCollectionsReducer;

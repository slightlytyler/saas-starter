import queryKey from 'common/data/queryKey';
import { get, has, map } from 'lodash/fp';

const selectRecordId = get('id');

const selectRecordsIds = map(selectRecordId);

const hasCollectionForQuery = (state, query) => has(queryKey(query), state);

const applyCollectionToState = (state, query, collection) => {
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
        return applyCollectionToState(state, payload.query, { loading: true });
      }
      return applyCollectionToState(
        state,
        payload.query,
        {
          ids: [],
          loading: true,
          pagination: {
            totalElements: 0,
            totalPages: 0,
          },
        },
      );
    }

    case actions.fetchCollection.types.succeed:
      return applyCollectionToState(
        state,
        payload.query,
        {
          ids: selectRecordsIds(payload.records),
          loading: false,
          pagination: payload.pagination,
        },
      );

    default:
      return state;
  }
};

export default createCollectionsReducer;

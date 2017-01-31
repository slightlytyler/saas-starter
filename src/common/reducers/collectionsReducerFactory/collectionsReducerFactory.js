import queryKey from 'common/data/queryKey';
import { get, has, map } from 'lodash/fp';

const applyModelToState = (query, state, model) => {
  const key = queryKey(queryKey);
  return {
    ...state,
    [key]: {
      ...state[key],
      ...model,
      timestamp: new Date().toString(),
    },
  };
};

const hasModelForQuery = (query, state) => has(queryKey(query), state);

const initialProps = {
  ids: [],
  loading: true,
  pagination: {
    totalElements: 0,
    totalPages: 0,
  },
};

const selectIdFromRecord = get('id');

const selectIdsFromCollection = map(selectIdFromRecord);

const collectionsReducerFactory = actions => (state = {}, { type, payload }) => {
  switch (type) {
    case actions.fetchCollection.types.initiate: {
      if (hasModelForQuery(payload.query, state)) {
        return applyModelToState(
          payload.query,
          state,
          { loading: true },
        );
      }
      return applyModelToState(
        payload.query,
        state,
        initialProps,
      );
    }

    case actions.fetchCollection.types.succeed:
      return applyModelToState(
        payload.query,
        state,
        {
          ids: selectIdsFromCollection(payload.records),
          loading: false,
          pagination: payload.pagination,
        },
      );

    default:
      return state;
  }
};

export default collectionsReducerFactory;

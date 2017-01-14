import queryKey from 'common/data/queryKey';
import { assign, compose, get, map } from 'lodash/fp';

const selectRecordId = get('id');
const selectRecordsIds = map(selectRecordId);
const createCollectionIndex = ({ error = null, loading = false, pagination, query, records }) => ({
  [queryKey(query)]: {
    error,
    ids: records ? selectRecordsIds(records) : undefined,
    loading,
    pagination,
    query,
    timestamp: new Date().toString(),
  },
});
const collectionDefaults = {
  records: [],
  pagination: {
    totalElements: 0,
    totalPages: 0,
  },
};
const applyDefaultsToCollection = assign(collectionDefaults);
const applyCollectionToState = state => compose(assign(state), createCollectionIndex);
const createCollectionsReducer = actions => (state = {}, { type, payload }) => {
  switch (type) {
    case actions.fetchCollection.types.initiate:
      return compose(
        applyCollectionToState(state),
        applyDefaultsToCollection,
        assign({ loading: true }),
      )(payload);
    case actions.fetchCollection.types.succeed:
      return applyCollectionToState(state)(payload);
    default:
      return state;
  }
};
export default createCollectionsReducer;

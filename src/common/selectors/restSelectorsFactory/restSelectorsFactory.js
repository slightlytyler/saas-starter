import queryKey from 'common/data/queryKey';
import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

const restSelectorsFactory = selectSubstate => {
  const selectCollections = createSelector(
    selectSubstate,
    get('collections'),
  );
  const selectCollectionByQuery = createSelector(
    selectCollections,
    (state, query) => query,
    (collections, query) => get(queryKey(query), collections),
  );
  const selectRecords = createSelector(
    selectSubstate,
    get('records'),
  );
  const selectRecordById = createSelector(
    selectRecords,
    (state, id) => id,
    (records, id) => get(id, records),
  );
  return {
    selectCollections,
    selectCollectionByQuery,
    selectRecords,
    selectRecordById,
  };
};

export default restSelectorsFactory;

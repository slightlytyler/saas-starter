import queryKey from 'common/data/queryKey';
import { get } from 'lodash/fp';
import { createSelector } from 'reselect';
import { name } from './config';

export const selectSubstate = get(name);

export const selectCollections = createSelector(
  selectSubstate,
  get('collections'),
);

export const selectCollectionByQuery = createSelector(
  selectCollections,
  (state, query) => query,
  (collections, query) => get(queryKey(query), collections),
);

export const selectRecords = createSelector(
  selectSubstate,
  get('records'),
);

export const selectRecordById = createSelector(
  selectRecords,
  (state, id) => id,
  (records, id) => get(id, records),
);

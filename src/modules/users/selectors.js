import createRestSelectors from 'common/selectors/createRestSelectors';
import { get } from 'lodash/fp';
import { stateKey } from './config';

export const selectSubstate = get(stateKey);

export const {
  selectCollections,
  selectCollectionByQuery,
  selectRecords,
  selectRecordById,
} = createRestSelectors(selectSubstate);

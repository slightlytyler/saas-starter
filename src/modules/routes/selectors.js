import restSelectorsFactory from 'common/selectors/restSelectorsFactory';
import { get } from 'lodash/fp';
import { stateKey } from './config';

export const selectSubstate = get(stateKey);

export const {
  selectCollectionByQuery,
  selectRecordById,
} = restSelectorsFactory(selectSubstate);

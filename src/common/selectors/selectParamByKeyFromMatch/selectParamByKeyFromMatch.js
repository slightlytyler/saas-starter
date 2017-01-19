import { get } from 'lodash/fp';
import { createSelector } from 'reselect';
import selectParamsFromMatch from '../selectParamsFromMatch';

const selectParamByKeyFromMatch = createSelector(
  selectParamsFromMatch,
  (match, key) => key,
  (params, key) => get(key, params),
);

export default selectParamByKeyFromMatch;

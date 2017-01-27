import { get, head } from 'lodash/fp';
import { createSelector } from 'reselect';
import { name } from './config';

export const selectSubstate = get(name);

export const selectFirstRecord = createSelector(
  selectSubstate,
  head,
);

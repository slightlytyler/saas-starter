import { get } from 'lodash/fp';
import { createSelector } from 'reselect';
import { name } from './config';

export const selectSubstate = get(name);

export const selectToken = createSelector(
  selectSubstate,
  get('token'),
);

export const selectIsAuthenticated = createSelector(
  selectToken,
  Boolean,
);

export const selectUser = createSelector(
  selectSubstate,
  get('user'),
);

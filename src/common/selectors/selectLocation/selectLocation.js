import { get } from 'lodash/fp';
import { createSelector } from 'reselect';
import selectRouter from '../selectRouter';

const selectLocation = createSelector(
  selectRouter,
  get('location'),
);

export default selectLocation;

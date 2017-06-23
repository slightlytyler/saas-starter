import {get} from 'lodash/fp';
import {createSelector} from 'reselect';
import selectLocation from 'core/router/selectors/selectLocation';

const selectSearch = createSelector(selectLocation, get('search'));

export default selectSearch;

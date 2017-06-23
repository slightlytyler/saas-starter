import {compose, replace} from 'lodash/fp';
import qs from 'qs';
import {createSelector} from 'reselect';
import selectSearch from 'core/router/selectors/selectSearch';

const withoutPrefix = replace('?', '');

const selectParams = compose(qs.parse, withoutPrefix);

const selectSearchParams = createSelector(selectSearch, selectParams);

export default selectSearchParams;

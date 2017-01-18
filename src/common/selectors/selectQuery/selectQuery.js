import { get } from 'lodash/fp';
import { defaultMemoize as memoize } from 'reselect';

const selectQuery = memoize(match => get('query', match) || {});
export default selectQuery;

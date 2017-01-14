import { get } from 'lodash/fp';
import { defaultMemoize as memoize } from 'reselect';

const selectQuery = memoize(location => get('query', location) || {});
export default selectQuery;

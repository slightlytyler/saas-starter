import { get } from 'lodash/fp';
import { defaultMemoize as memoize } from 'reselect';

const selectQueryFromMatch = memoize(match => get('query', match) || {});

export default selectQueryFromMatch;

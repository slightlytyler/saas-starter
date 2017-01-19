import { get } from 'lodash/fp';
import { defaultMemoize as memoize } from 'reselect';

const selectParamsFromMatch = memoize(match => get('params', match) || {});

export default selectParamsFromMatch;

import { isObject, size } from 'lodash/fp';
import qs from 'qs';

const queryKey = query => ((isObject(query) && size(query)) ? qs.stringify(query) : 'root');

export default queryKey;

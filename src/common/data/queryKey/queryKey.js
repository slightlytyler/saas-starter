import { isObject, size } from 'lodash/fp';
import qs from 'qs';

export default query => ((isObject(query) && size(query)) ? qs.stringify(query) : 'root');

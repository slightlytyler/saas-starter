import { curry, size } from 'lodash/fp';
import qs from 'qs';

export default curry((params, endpoint) => (size(params) ? `${endpoint}?${qs.stringify(params)}` : endpoint));

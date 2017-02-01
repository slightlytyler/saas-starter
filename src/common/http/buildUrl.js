import { size } from 'lodash/fp';
import path from 'path';
import qs from 'qs';
import { API_BASE_PATH, API_HOST, API_SCHEME } from 'src/config';

const buildQueryString = query => (size(query) ? `?${qs.stringify(query)}` : '');

const buildUrl = query => endpoint => (
  `${API_SCHEME}://${path.join(API_HOST, API_BASE_PATH, endpoint)}${buildQueryString(query)}`
);

export default buildUrl;

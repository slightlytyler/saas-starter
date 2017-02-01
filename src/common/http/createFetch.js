import { compose, invoke, omit, toArray, zipObject } from 'lodash/fp';
import { API_TOKEN_KEY } from 'src/config';
import buildUrl from './buildUrl';

const authHeader = token => (token ? { [API_TOKEN_KEY]: token } : {});

const defaultOptions = {
  cache: 'default',
  mode: 'cors',
};

const omitQuery = async r => {
  const response = await r;
  return omit('body.query', response);
};

const toJson = async r => {
  const response = await r;
  const headers = zipObject(
    compose(toArray, invoke('keys'))(response.headers),
    compose(toArray, invoke('values'))(response.headers),
  );
  const token = headers[API_TOKEN_KEY];
  const { ok, status, statusText } = response;
  const body = await response.json();
  return { body, headers, ok, status, statusText, token };
};

const customFetch = options => url => fetch(url, options);

const createFetch = ({ body, endpoint, headers = {}, method = 'GET', query, token }) => compose(
  omitQuery,
  toJson,
  customFetch({
    ...defaultOptions,
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
      ...authHeader(token),
      ...headers,
    }),
    method,
  }),
  buildUrl(query),
)(endpoint);

export default createFetch;

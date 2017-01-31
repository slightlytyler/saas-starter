import { compose, get as lodashGet } from 'lodash/fp';
import { API_TOKEN_KEY } from 'src/config';
import queryString from './queryString';
import fetch from './fetch';
import url from './url';

const defaultOptions = {
  cache: 'default',
  mode: 'cors',
};

let token = null;

export const registerToken = t => { token = t; };

export const deregisterToken = () => { token = null; };

export const selectToken = lodashGet(API_TOKEN_KEY);

const authHeader = () => (token ? { [API_TOKEN_KEY]: token } : {});

const baseHeaders = () => ({
  ...authHeader(),
  'Content-Type': 'application/json',
});

const methods = {
  delete: ({ endpoint, headers }) => compose(
    fetch({
      ...defaultOptions,
      headers: new Headers({
        ...baseHeaders(),
        ...headers,
      }),
      method: 'DELETE',
    }),
    url,
  )(endpoint),
  get: ({ endpoint, headers, query }) => compose(
    fetch({
      ...defaultOptions,
      headers: new Headers({
        ...baseHeaders(),
        ...headers,
      }),
    }),
    url,
    queryString(query),
  )(endpoint),
  patch: ({ body, endpoint, headers }) => compose(
    fetch({
      ...defaultOptions,
      body: JSON.stringify(body),
      headers: new Headers({
        ...baseHeaders(),
        ...headers,
      }),
      method: 'PATCH',
    }),
    url,
  )(endpoint),
  post: ({ body, endpoint, headers }) => compose(
    fetch({
      ...defaultOptions,
      body: JSON.stringify(body),
      headers: new Headers({
        ...baseHeaders(),
        ...headers,
      }),
      method: 'POST',
    }),
    url,
  )(endpoint),
  put: ({ body, endpoint, headers }) => compose(
    fetch({
      ...defaultOptions,
      body: JSON.stringify(body),
      headers: new Headers({
        ...baseHeaders(),
        ...headers,
      }),
      method: 'PUT',
    }),
    url,
  )(endpoint),
};

export default { ...methods, registerToken, deregisterToken, selectToken };

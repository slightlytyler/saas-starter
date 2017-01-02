import { compose } from 'lodash/fp';
import queryString from './queryString';
import fetch from './fetch';
import url from './url';

const defaultOptions = {
  cache: 'default',
  mode: 'cors',
};

export const get = ({ endpoint, params }) => compose(
  fetch(defaultOptions),
  url,
  queryString(params),
)(endpoint);

export const post = ({ body, endpoint }) => compose(
  fetch({
    ...defaultOptions,
    body: JSON.stringify(body),
    method: 'POST',
  }),
  url,
)(endpoint);

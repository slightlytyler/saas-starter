import { compose, curry, invoke, omit, toArray, zipObject } from 'lodash/fp';

const handleErrors = async r => {
  const response = await r;
  if (!response.ok) throw Error(response.statusText);
  return response;
};

const toJson = async r => {
  const response = await r;
  const headers = zipObject(
    compose(toArray, invoke('keys'))(response.headers),
    compose(toArray, invoke('values'))(response.headers),
  );
  const body = await response.json();
  return { body, headers };
};

const omitQuery = async r => {
  const response = await r;
  return omit('body.query', response);
};

export default curry((options, url) => compose(
  omitQuery,
  toJson,
  handleErrors,
  fetch,
)(url, options));

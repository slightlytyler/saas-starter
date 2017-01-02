import { compose, curry, invoke, toArray, zipObject } from 'lodash/fp';

const toJson = async response => {
  const r = await response;
  const headers = zipObject(compose(toArray, invoke('keys'))(r.headers), compose(toArray, invoke('values'))(r.headers));
  const body = await r.json();
  return { body, headers };
};

export default curry((options, url) => compose(toJson, fetch)(url, options));

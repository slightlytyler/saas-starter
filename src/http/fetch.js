import { compose, curry, invoke, toArray, zipObject } from 'lodash/fp';

const handleErrors = async response => {
  const r = await response;
  if (!r.ok) throw Error(r.statusText);
  return r;
};

const toJson = async response => {
  const r = await response;
  const headers = zipObject(
    compose(toArray, invoke('keys'))(r.headers),
    compose(toArray, invoke('values'))(r.headers),
  );
  const body = await r.json();
  return { body, headers };
};

export default curry((options, url) => compose(toJson, handleErrors, fetch)(url, options));

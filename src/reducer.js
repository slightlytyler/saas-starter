import { set } from 'lodash';
import { compose, get, has } from 'lodash/fp';
import { combineReducers } from 'redux'

export const makeRootReducer = asyncReducers => combineReducers({
  test: () => ({}),
  ...asyncReducers
});

const applyAsyncReducers = store => compose(
  store.replaceReducer, 
  makeRootReducer, 
  get('asyncReducers')
)(store);

export const injectReducer = (store, { key, reducer }) => {
  const path = ['asyncReducers', key];
  if (has(path, store)) return;
  set(store, path, reducer);
  applyAsyncReducers(store);
};

export default makeRootReducer();

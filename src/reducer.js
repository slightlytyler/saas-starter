import { compose } from 'lodash/fp';
import { combineReducers } from 'redux';

const asyncReducers = {};

export const makeRootReducer = () => combineReducers({
  test: () => ({}),
  ...asyncReducers,
});

const applyAsyncReducers = store => compose(
  store.replaceReducer,
  makeRootReducer,
)();

export const injectReducer = (store, { key, reducer }) => {
  asyncReducers[key] = reducer;
  applyAsyncReducers(store);
};

export default makeRootReducer();

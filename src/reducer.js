import { compose } from 'lodash/fp';
import { combineReducers } from 'redux';
import { reducer as storageWrapper } from 'redux-storage';
import authReducer from 'modules/auth/reducer';

const asyncReducers = {};

export const makeRootReducer = () => combineReducers({
  auth: authReducer,
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

export default compose(storageWrapper, makeRootReducer)();

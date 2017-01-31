import { map, zipObject } from 'lodash/fp';
import { combineReducers } from 'redux';
import collectionsReducerFactory from '../collectionsReducerFactory';
import recordsReducerFactory from '../recordsReducerFactory';

const placeholderActionTypes = [
  'createRecord',
  'deleteRecord',
  'fetchCollection',
  'fetchRecord',
  'updateRecord',
];

const placeholerActionShape = {
  types: {
    initiate: '@@PLACEHOLDER',
    succeed: '@@PLACEHOLDER',
    fail: '@@PLACEHOLDER',
    cancel: '@@PLACEHOLDER',
  },
};

const placeholderActions = zipObject(
  placeholderActionTypes,
  map(() => placeholerActionShape, placeholderActionTypes),
);

const restReducerFactory = definedActions => {
  const actions = {
    ...placeholderActions,
    ...definedActions,
  };
  return combineReducers({
    collections: collectionsReducerFactory(actions),
    records: recordsReducerFactory(actions),
  });
};

export default restReducerFactory;

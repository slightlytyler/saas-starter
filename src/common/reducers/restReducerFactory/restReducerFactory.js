import { combineReducers } from 'redux';
import collectionsReducerFactory from '../collectionsReducerFactory';
import recordsReducerFactory from '../recordsReducerFactory';

const restReducerFactory = actions => combineReducers({
  collections: collectionsReducerFactory(actions),
  records: recordsReducerFactory(actions),
});

export default restReducerFactory;

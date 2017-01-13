import { combineReducers } from 'redux';
import createCollectionsReducer from '../createCollectionsReducer';
import createRecordsReducer from '../createRecordsReducer';

const createRestReducer = actions => combineReducers({
  collections: createCollectionsReducer(actions),
  records: createRecordsReducer(actions),
});

export default createRestReducer;

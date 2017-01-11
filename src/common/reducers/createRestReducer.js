import { combineReducers } from 'redux';

const createCollectionsReducer = () => () => false;

const createRecordsReducer = () => () => false;

export default actionTypes => combineReducers({
  collections: createCollectionsReducer(actionTypes),
  records: createRecordsReducer(actionTypes),
});

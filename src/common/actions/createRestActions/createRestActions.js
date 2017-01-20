import _createAction from 'common/actions/createAction';
import generateCreateRecord from './generateCreateRecord';
import generateDeleteRecord from './generateDeleteRecord';
import generateFetchCollection from './generateFetchCollection';
import generateFetchRecord from './generateFetchRecord';
import generateReplaceRecord from './generateReplaceRecord';
import generateUpdateRecord from './generateUpdateRecord';

const createRestActions = stateKey => {
  const createAction = _createAction(stateKey);
  return {
    createRecord: generateCreateRecord(createAction),
    deleteRecord: generateDeleteRecord(createAction),
    fetchCollection: generateFetchCollection(createAction),
    fetchRecord: generateFetchRecord(createAction),
    replaceRecord: generateReplaceRecord(createAction),
    updateRecord: generateUpdateRecord(createAction),
  };
};

export default createRestActions;
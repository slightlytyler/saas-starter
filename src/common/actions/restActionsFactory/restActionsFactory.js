import actionFactory from '../actionFactory';
import generateCreateRecord from './generateCreateRecord';
import generateDeleteRecord from './generateDeleteRecord';
import generateFetchCollection from './generateFetchCollection';
import generateFetchRecord from './generateFetchRecord';
import generateUpdateRecord from './generateUpdateRecord';

const restActionsFactory = stateKey => {
  const createAction = actionFactory(stateKey);
  return {
    createRecord: generateCreateRecord(createAction),
    deleteRecord: generateDeleteRecord(createAction),
    fetchCollection: generateFetchCollection(createAction),
    fetchRecord: generateFetchRecord(createAction),
    updateRecord: generateUpdateRecord(createAction),
  };
};

export default restActionsFactory;

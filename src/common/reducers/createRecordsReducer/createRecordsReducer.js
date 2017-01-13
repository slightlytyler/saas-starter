import { assign, compose, omit, reduce } from 'lodash/fp';

const createRecordDuple = record => ({ [record.id]: record });

const applyRecordToState = (state, record) => compose(assign(state), createRecordDuple)(record);

const applyCollectionToState = (state, records) => compose(
  assign(state),
  reduce(applyRecordToState, {}),
)(records);

const detachRecordFromState = (state, { id }) => omit(id, state);

const createRecordsReducer = actions => (state = {}, { type, payload }) => {
  switch (type) {
    case actions.createRecord.types.succeed:
    case actions.fetchRecord.types.succeed:
    case actions.updateRecord.types.succeed:
      return applyRecordToState(state, payload);

    case actions.deleteRecord.types.succeed:
      return detachRecordFromState(state, payload);

    case actions.fetchCollection.types.succeed:
      return applyCollectionToState(state, payload.records);

    default:
      return state;
  }
};

export default createRecordsReducer;

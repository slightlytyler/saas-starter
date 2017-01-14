import { assign, compose, get, map, reduce } from 'lodash/fp';

const createRecordIndex = ({ body, deleted = false, error = null, loading = false }) => ({
  [body.id]: {
    body,
    deleted,
    error,
    loading,
    timestamp: new Date().toString(),
  },
});
const applyRecordToState = state => compose(assign(state), createRecordIndex);
const createDataProp = record => ({ body: record });
const reduceIndexes = reduce((acc, index) => ({ ...acc, ...index }), {});
const applyCollectionToState = state => compose(
  assign(state),
  reduceIndexes,
  map(createRecordIndex),
);
const selectRecords = get('records');
const createRecordsReducer = actions => (state = {}, { type, payload }) => {
  switch (type) {
    case actions.createRecord.types.succeed:
    case actions.fetchRecord.types.succeed:
    case actions.updateRecord.types.succeed:
      return compose(
        applyRecordToState(state),
        createDataProp,
      )(payload);
    case actions.deleteRecord.types.succeed:
      return compose(
        applyRecordToState(state),
        assign({ deleted: true }),
        createDataProp,
      )(payload);
    case actions.fetchCollection.types.succeed:
      return compose(
        applyCollectionToState(state),
        map(createDataProp),
        selectRecords,
      )(payload);
    default:
      return state;
  }
};
export default createRecordsReducer;

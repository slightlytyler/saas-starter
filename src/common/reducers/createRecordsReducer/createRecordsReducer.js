import { assign, compose, get, map, zipObject } from 'lodash/fp';

const applyInitialProps = assign({ deleted: false, loading: false });

const applyNestedBody = record => ({ body: record });

const applyTimestamp = model => assign({ timestamp: new Date().toString() }, model);

const createRecordsById = records => zipObject(map(get('body.id'), records), records);

const applyCollectionToState = (state, records) => ({
  ...state,
  ...compose(
    createRecordsById,
    map(compose(applyTimestamp, applyInitialProps, applyNestedBody)),
  )(records),
});

const applyModelToState = (state, model) => ({
  ...state,
  [model.body.id]: {
    ...state[model.body.id],
    ...model,
  },
});

const createRecordsReducer = actions => (state = {}, { type, payload }) => {
  switch (type) {
    case actions.createRecord.types.succeed:
    case actions.fetchRecord.types.succeed:
    case actions.updateRecord.types.succeed:
      return applyModelToState(
        state,
        compose(applyTimestamp, applyInitialProps, applyNestedBody)(payload),
      );

    case actions.deleteRecord.types.succeed:
      return applyModelToState(
        state,
        compose(
          applyTimestamp,
          assign({ deleted: true, loading: false }),
          applyNestedBody,
        )(payload),
      );

    case actions.fetchCollection.types.succeed:
      return applyCollectionToState(state, payload.records);

    default:
      return state;
  }
};

export default createRecordsReducer;

import { reduce } from 'lodash/fp';

const initialProps = { deleted: false, loading: false };

const applyModelToState = (id, state, model) => ({
  ...state,
  [id]: {
    ...state[id],
    ...model,
    timestamp: new Date().toString(),
  },
});

const createRecordsReducer = actions => (state = {}, { type, payload }) => {
  switch (type) {
    case actions.createRecord.types.succeed:
    case actions.fetchRecord.types.succeed:
    case actions.updateRecord.types.succeed:
      return applyModelToState(
        payload.id,
        state,
        {
          ...initialProps,
          body: payload,
        },
      );

    case actions.deleteRecord.types.initiate:
      return applyModelToState(
        payload.id,
        state,
        { deleted: true },
      );

    case actions.fetchCollection.types.succeed:
      return reduce(
        (acc, el) => applyModelToState(
          el.id,
          acc,
          {
            ...initialProps,
            body: el,
          },
        ),
        state,
        payload.records,
      );

    default:
      return state;
  }
};

export default createRecordsReducer;

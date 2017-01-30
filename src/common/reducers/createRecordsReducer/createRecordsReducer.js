import { reduce } from 'lodash/fp';

const initialProps = { deleted: false, loading: false };

const timestamp = () => ({ timestamp: new Date().toString() });

const applyModelToState = (id, state, model) => ({
  ...state,
  [id]: {
    ...state[id],
    ...model,
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
          ...timestamp,
          body: payload,
        },
      );

    case actions.deleteRecord.types.initiate:
      return applyModelToState(
        payload.id,
        state,
        {
          ...timestamp(),
          deleted: true,
        },
      );

    case actions.fetchCollection.types.succeed:
      return reduce(
        (acc, el) => applyModelToState(
          el.id,
          acc,
          {
            ...initialProps,
            ...timestamp(),
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

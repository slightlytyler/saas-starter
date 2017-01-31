import { has, reduce } from 'lodash/fp';

const applyModelToState = (id, state, model) => ({
  ...state,
  [id]: {
    ...state[id],
    ...model,
    timestamp: new Date().toString(),
  },
});

const hasModelForId = has;

const initialProps = { deleted: false, loading: true };

const recordsReducerFactory = actions => (state = {}, { type, payload }) => {
  switch (type) {
    case actions.createRecord.types.succeed:
      return applyModelToState(
        payload.id,
        state,
        {
          ...initialProps,
          loading: false,
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

    case actions.fetchRecord.types.initiate: {
      if (hasModelForId(payload.id, state)) {
        return applyModelToState(
          payload.id,
          state,
          { loading: true },
        );
      }
      return applyModelToState(
        payload.id,
        state,
        {
          ...initialProps,
          body: payload,
        },
      );
    }

    case actions.fetchRecord.types.succeed:
      return applyModelToState(
        payload.id,
        state,
        {
          loading: false,
          body: payload,
        },
      );

    case actions.updateRecord.types.initiate:
    case actions.updateRecord.types.succeed:
      return applyModelToState(
        payload.id,
        state,
        { body: payload },
      );

    default:
      return state;
  }
};

export default recordsReducerFactory;

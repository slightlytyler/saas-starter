import { dropRight } from 'lodash/fp';
import generateId from 'shortid';
import * as actions from './actions';

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.prompt.types.initiate:
      return [
        ...state,
        {
          ...payload,
          id: generateId(),
          type: 'prompt',
        },
      ];

    case actions.prompt.types.confirm:
    case actions.prompt.types.deny:
      return dropRight(1, state);

    default:
      return state;
  }
};

export default reducer;

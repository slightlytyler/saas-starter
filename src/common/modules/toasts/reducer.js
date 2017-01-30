import { drop } from 'lodash/fp';
import * as actions from './actions';

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.add.type:
      return [...state, payload];

    case actions.take.type:
      return drop(1, state);

    default:
      return state;
  }
};

export default reducer;

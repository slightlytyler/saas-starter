import { tail } from 'lodash/fp';
import * as actions from './actions';

const toastsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.add.type:
      return [...state, payload];

    case actions.take.type:
      return tail(state);

    default:
      return state;
  }
};

export default toastsReducer;

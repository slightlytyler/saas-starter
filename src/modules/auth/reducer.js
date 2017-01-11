import * as actions from './actions';

const initialState = { token: null };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.login.types.succeed:
    case actions.signUp.types.succeed:
      return payload;

    case actions.logout.type:
      return initialState;

    default:
      return state;
  }
};

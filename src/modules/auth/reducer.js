import * as actions from './actions';

export default (state = {}, { payload, type }) => {
  switch (type) {
    case actions.login.type:
      return { ...state, token: 'some_token' };

    default:
      return state;
  }
};

import _createAction from 'common/actions/createAction';

const createAction = _createAction('auth');

export const login = createAction({
  type: 'LOGIN',
  creator: type => data => ({
    type,
    payload: data,
  }),
});

export const signUp = createAction({
  type: 'SIGN_UP',
  creator: type => data => ({
    type,
    payload: data,
  }),
});

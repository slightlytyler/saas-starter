import _createAction from 'common/actions/createAction';
import { name } from './config';

const createAction = _createAction(name);

export const login = createAction({
  type: 'LOGIN',
  creator: {
    initiate: type => data => ({
      type,
      payload: data,
    }),
    succeed: type => data => ({
      type,
      payload: data,
    }),
    fail: type => data => ({
      type,
      payload: data,
    }),
    cancel: type => data => ({
      type,
      payload: data,
    }),
  },
});

export const signUp = createAction({
  type: 'SIGN_UP',
  creator: {
    initiate: type => data => ({
      type,
      payload: data,
    }),
    succeed: type => data => ({
      type,
      payload: data,
    }),
    fail: type => data => ({
      type,
      payload: data,
    }),
    cancel: type => data => ({
      type,
      payload: data,
    }),
  },
});

export const logout = createAction({
  type: 'LOGOUT',
  creator: type => data => ({
    type,
    payload: data,
  }),
});


import actionFactory from 'common/actions/actionFactory';
import { name } from './config';

const createAction = actionFactory(name);

export const deregisterToken = createAction({
  type: 'DEREGISTER_TOKEN',
  creator: type => () => ({ type }),
});

export const login = createAction({
  type: 'LOGIN',
  creator: {
    initiate: type => (data, callback) => ({
      type,
      payload: data,
      meta: { callback },
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
  creator: type => () => ({ type }),
});

export const registerToken = createAction({
  type: 'REGISTER_TOKEN',
  creator: type => data => ({
    type,
    payload: data,
  }),
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

import actionFactory from 'common/actions/actionFactory';
import restActionsFactory from 'common/actions/restActionsFactory';
import { name } from './config';

export const {
  fetchCollection,
  fetchRecord,
} = restActionsFactory(name);

const createAction = actionFactory(name);

export const resendInvite = createAction({
  type: 'RESEND_INVITE',
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
    cancel: type => () => ({ type }),
  },
});

export const sendInvite = createAction({
  type: 'SEND_INVITE',
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
    cancel: type => () => ({ type }),
  },
});

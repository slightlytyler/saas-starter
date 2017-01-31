import restActionsFactory from 'common/actions/restActionsFactory';
import { name } from './config';

export const {
  fetchCollection,
  fetchRecord,
} = restActionsFactory(name);

export const resendInvite = () => {};

export const sendInvite = () => {};

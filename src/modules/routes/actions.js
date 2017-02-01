import restActionsFactory from 'common/actions/restActionsFactory';
import { name } from './config';

export const {
  createRecord,
  deleteRecord,
  fetchCollection,
  fetchRecord,
  updateRecord,
} = restActionsFactory(name);

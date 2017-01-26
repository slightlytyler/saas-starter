import createRestActions from 'common/actions/createRestActions';
import { name } from './config';

export const {
  createRecord,
  deleteRecord,
  fetchCollection,
  fetchRecord,
  updateRecord,
} = createRestActions(name);

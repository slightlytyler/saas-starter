import createRestActions from 'common/actions/createRestActions';
import { stateKey } from './config';

export const {
  createRecord,
  deleteRecord,
  fetchCollection,
  fetchRecord,
  updateRecord,
} = createRestActions(stateKey);

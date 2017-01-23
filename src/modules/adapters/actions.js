import createRestActions from 'common/actions/createRestActions';
import _pushRelativeToRootPath from 'common/actions/pushRelativeToRootPath';
import { rootPath, stateKey } from './config';

export const {
  createRecord,
  deleteRecord,
  fetchCollection,
  fetchRecord,
  updateRecord,
} = createRestActions(stateKey);

const pushRelativeToRootPath = _pushRelativeToRootPath(rootPath);

export const transitionToCollectionViewer = () => pushRelativeToRootPath('/');

export const transitionToRecordCreator = () => pushRelativeToRootPath('/new');

export const transitionToRecordEditor = ({ id }) => pushRelativeToRootPath(`/${id}`);

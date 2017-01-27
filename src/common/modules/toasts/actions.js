import _createAction from 'common/actions/createAction';
import { name } from './config';

const createAction = _createAction(name);

export const add = createAction({
  type: 'ADD',
  creator: type => data => ({
    type,
    payload: data,
  }),
});

export const take = createAction({
  type: 'TAKE',
  creator: type => data => ({
    type,
    payload: data,
  }),
});

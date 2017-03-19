import actionFactory from 'common/actions/actionFactory';
import { name } from './config';

const createAction = actionFactory(name);

export const add = createAction({
  type: 'ADD',
  creator: type =>
    data => ({
      type,
      payload: data,
    }),
});

export const take = createAction({
  type: 'TAKE',
  creator: type =>
    data => ({
      type,
      payload: data,
    }),
});

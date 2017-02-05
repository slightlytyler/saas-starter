import actionFactory from 'common/actions/actionFactory';
import { name } from './config';

const createAction = actionFactory(name);

export const logout = createAction({
  type: 'LOGOUT',
  creator: type => () => ({ type }),
});

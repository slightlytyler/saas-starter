import _createAction from 'common/actions/createAction';
import { name } from './config';

const createAction = _createAction(name);

export const prompt = createAction({
  type: 'PROMPT',
  creator: {
    initiate: type => data => ({
      type,
      payload: data,
    }),
    confirm: type => data => ({
      type,
      payload: data,
    }),
    deny: type => data => ({
      type,
      payload: data,
    }),
  },
});

import actionFactory from 'common/actions/actionFactory';
import { name } from './config';

const createAction = actionFactory(name);

export const prompt = createAction({
  type: 'PROMPT',
  creator: {
    initiate: type =>
      data => ({
        type,
        payload: data,
      }),
    confirm: type =>
      data => ({
        type,
        payload: data,
      }),
    deny: type =>
      data => ({
        type,
        payload: data,
      }),
  },
});

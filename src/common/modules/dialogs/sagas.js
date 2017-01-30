import { compose } from 'lodash/fp';
import { put, race, take } from 'redux-saga/effects';
import * as actions from './actions';

export function* prompt(payload) {
  yield compose(put, actions.prompt.initiate)(payload);
  const { confirm, deny } = yield race({
    confirm: take(actions.prompt.types.confirm),
    deny: take(actions.prompt.types.deny),
  });
  return {
    confirm: Boolean(confirm),
    deny: Boolean(deny),
  };
}

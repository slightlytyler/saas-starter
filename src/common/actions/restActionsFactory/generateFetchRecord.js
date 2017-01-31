import { BEGIN, COMMIT, REVERT } from '@slightlytyler/redux-optimist';
import generateId from 'shortid';

const generateFetchRecord = createAction => createAction({
  type: 'FETCH_RECORD',
  creator: {
    initiate: type => data => ({
      type,
      payload: data,
      meta: {
        optimistic: BEGIN,
        transactionId: generateId(),
      },
    }),
    succeed: type => transactionId => data => ({
      type,
      payload: data,
      meta: {
        optimistic: COMMIT,
        transactionId,
      },
    }),
    fail: type => transactionId => data => ({
      type,
      payload: data,
      meta: {
        optimistic: REVERT,
        transactionId,
      },
    }),
    cancel: type => transactionId => data => ({
      type,
      payload: data,
      meta: {
        optimistic: REVERT,
        transactionId,
      },
    }),
  },
});

export default generateFetchRecord;

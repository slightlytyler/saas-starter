import { compose, get, identity } from 'lodash/fp';
import withRecordFetcher from '../withRecordFetcher';
import withRecordSelector from '../withRecordSelector';

const defaultSelectId = get('id');

const withRecord =
  ({ fetchRecord, selectRecordById }) =>
  ({ fetchEvents = ['mount', 'update'], newKey = 'new', selectId = defaultSelectId } = {}) => compose(
    fetchEvents !== false
      ? withRecordFetcher({ fetchEvents, fetchRecord, newKey, selectId })
      : identity,
    withRecordSelector({ selectId, selectRecordById }) : identity,
  );


export default withRecord;

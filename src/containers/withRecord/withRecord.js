import { compose, get, identity } from 'lodash/fp';
import withRecordFetcher from '../withRecordFetcher';
import withRecordSelector from '../withRecordSelector';

const defaultSelectId = get('id');

const withRecord =
  ({ fetchRecord, selectRecordById }) =>
  ({ fetch = true, select = true, selectId = defaultSelectId } = {}) => compose(
    fetch ? withRecordFetcher(fetchRecord, selectId) : identity,
    select ? withRecordSelector(selectRecordById, selectId) : identity,
  );


export default withRecord;

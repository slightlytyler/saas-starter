import { compose, get, identity } from 'lodash/fp';
import withRecordFetcher from '../withRecordFetcher';
import withRecordSelector from '../withRecordSelector';

const defaultIdSelector = get('id');

const withRecord =
  ({ fetchRecord, selectRecordById }) =>
  ({ fetch = true, idSelector = defaultIdSelector, select = true } = {}) => compose(
    fetch ? withRecordFetcher(fetchRecord, idSelector) : identity,
    select ? withRecordSelector(selectRecordById, idSelector) : identity,
  );


export default withRecord;

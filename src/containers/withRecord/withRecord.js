import { compose, identity } from 'lodash/fp';
import withRecordFetcher from '../withRecordFetcher';
import withRecordSelector from '../withRecordSelector';

const withRecord = ({ action, selector }) => {
  const withFetcher = withRecordFetcher(action);
  const withSelector = withRecordSelector(selector);
  return ({ fetch = true, select = true } = {}) => compose(
    fetch ? withFetcher : identity,
    select ? withSelector : identity,
  );
};

export default withRecord;

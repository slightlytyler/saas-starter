import { compose, identity } from 'lodash/fp';
import withCollectionFetcher from '../withCollectionFetcher';
import withCollectionSelector from '../withCollectionSelector';

const withCollection = ({ action, selector }) => {
  const withFetcher = withCollectionFetcher(action);
  const withSelector = withCollectionSelector(selector);
  return ({ fetch = true, select = true } = {}) => compose(
    fetch ? withFetcher : identity,
    select ? withSelector : identity,
  );
};

export default withCollection;

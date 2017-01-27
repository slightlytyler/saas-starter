import { compose, identity } from 'lodash/fp';
import withCollectionFetcher from '../withCollectionFetcher';
import withCollectionSelector from '../withCollectionSelector';

const withCollection = ({ fetchCollection, selectCollectionByQuery }) => {
  const withFetcher = withCollectionFetcher(fetchCollection);
  const withSelector = withCollectionSelector(selectCollectionByQuery);
  return ({ fetch = true, select = true } = {}) => compose(
    fetch ? withFetcher : identity,
    select ? withSelector : identity,
  );
};

export default withCollection;

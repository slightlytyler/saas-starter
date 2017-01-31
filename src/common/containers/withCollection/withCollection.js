import { compose, get, identity } from 'lodash/fp';
import withCollectionFetcher from '../withCollectionFetcher';
import withCollectionSelector from '../withCollectionSelector';

const defaultSelectQuery = get('query');

const withCollection =
  ({ fetchCollection, selectCollectionByQuery }) =>
  ({ fetch = true, select = true, selectQuery = defaultSelectQuery } = {}) => compose(
    fetch ? withCollectionFetcher(fetchCollection, selectQuery) : identity,
    select ? withCollectionSelector(selectCollectionByQuery, selectQuery) : identity,
  );

export default withCollection;

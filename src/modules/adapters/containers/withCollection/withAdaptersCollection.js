import withCollection from 'containers/withCollection';
import { fetchCollection } from '../../actions';
import { selectCollectionByQuery } from '../../selectors';

const withAdaptersCollection = withCollection({
  fetchCollection,
  selectCollectionByQuery,
});

export default withAdaptersCollection;

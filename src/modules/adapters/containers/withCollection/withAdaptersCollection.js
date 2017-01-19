import withCollection from 'containers/withCollection';
import { fetchCollection } from '../../actions';
import { selectCollectionByQuery } from '../../selectors';

const withAdaptersCollection = withCollection({
  action: fetchCollection,
  selector: selectCollectionByQuery,
});

export default withAdaptersCollection;

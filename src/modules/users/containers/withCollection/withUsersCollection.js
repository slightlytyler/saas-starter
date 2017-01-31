import withCollection from 'common/containers/withCollection';
import { fetchCollection } from '../../actions';
import { selectCollectionByQuery } from '../../selectors';

const withUsersCollection = withCollection({
  fetchCollection,
  selectCollectionByQuery,
});

export default withUsersCollection;

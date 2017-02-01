import withCollection from 'common/containers/withCollection';
import { fetchCollection } from '../../actions';
import { selectCollectionByQuery } from '../../selectors';

const withRoutesCollection = withCollection({
  fetchCollection,
  selectCollectionByQuery,
});

export default withRoutesCollection;

import withCollectionFetcher from 'containers/withCollectionFetcher';
import { fetchCollection } from '../../actions';

const withAdaptersCollectionFetcher = withCollectionFetcher(fetchCollection);

export default withAdaptersCollectionFetcher;

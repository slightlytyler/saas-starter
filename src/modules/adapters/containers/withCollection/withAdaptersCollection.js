import withCollection from 'containers/withCollection';
import { selectCollectionByQuery } from '../../selectors';

const withAdaptersCollection = withCollection(selectCollectionByQuery);

export default withAdaptersCollection;

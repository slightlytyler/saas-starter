import withRecordFetcher from 'containers/withRecordFetcher';
import { fetchRecord } from '../../actions';

const withAdaptersRecordFetcher = withRecordFetcher(fetchRecord);

export default withAdaptersRecordFetcher;

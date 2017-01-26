import withRecord from 'containers/withRecord';
import { fetchRecord } from '../../actions';
import { selectRecordById } from '../../selectors';

const withAdaptersRecord = withRecord({
  fetchRecord,
  selectRecordById,
});

export default withAdaptersRecord;

import withRecord from 'containers/withRecord';
import { fetchRecord } from '../../actions';
import { selectRecordById } from '../../selectors';

const withAdaptersRecord = withRecord({
  action: fetchRecord,
  selector: selectRecordById,
});

export default withAdaptersRecord;

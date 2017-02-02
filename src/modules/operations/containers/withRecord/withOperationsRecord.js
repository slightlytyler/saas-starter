import withRecord from 'common/containers/withRecord';
import { fetchRecord } from '../../actions';
import { selectRecordById } from '../../selectors';

const withOperationsRecord = withRecord({
  fetchRecord,
  selectRecordById,
});

export default withOperationsRecord;

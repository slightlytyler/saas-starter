import withRecord from 'common/containers/withRecord';
import { fetchRecord } from '../../actions';
import { selectRecordById } from '../../selectors';

const withRoutesRecord = withRecord({
  fetchRecord,
  selectRecordById,
});

export default withRoutesRecord;

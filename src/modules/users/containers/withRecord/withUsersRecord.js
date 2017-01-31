import withRecord from 'common/containers/withRecord';
import { fetchRecord } from '../../actions';
import { selectRecordById } from '../../selectors';

const withUsersRecord = withRecord({
  fetchRecord,
  selectRecordById,
});

export default withUsersRecord;

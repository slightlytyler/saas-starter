import withRecord from 'containers/withRecord';
import { selectRecordById } from '../../selectors';

const withAdaptersRecord = withRecord(selectRecordById);

export default withAdaptersRecord;

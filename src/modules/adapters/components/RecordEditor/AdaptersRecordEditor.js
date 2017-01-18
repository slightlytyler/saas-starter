import withActions from 'containers/withActions';
import { compose, get } from 'lodash/fp';
import { mapProps } from 'recompose';
import Form from '../Form';
import { updateRecord } from '../../actions';
import withRecord from '../../containers/withRecord';
import withRecordFetcher from '../../containers/withRecordFetcher';

export default compose(
  withRecordFetcher,
  withRecord,
  withActions({ updateRecord }),
  mapProps(({ actions, record }) => ({
    defaultValue: get('body', record),
    loading: !record,
    onSubmit: actions.updateRecord,
  })),
)(Form);

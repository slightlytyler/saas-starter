import withActions from 'containers/withActions';
import { compose } from 'lodash/fp';
import { mapProps } from 'recompose';
import Form from '../Form';
import { createRecord } from '../../actions';

export default compose(
  withActions({ createRecord }),
  mapProps(({ actions }) => ({ onSubmit: actions.createRecord })),
)(Form);

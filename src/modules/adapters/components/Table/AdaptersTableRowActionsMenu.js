import colors from 'colors';
import ActionsMenu from 'components/ActionsMenu';
import withActions from 'containers/withActions';
import { compose } from 'lodash/fp';
import { mapProps } from 'recompose';
import { deleteRecord, transitionToRecordEditor } from '../../actions';

export default compose(
  withActions(({ id }) => ({
    deleteRecord: () => deleteRecord({ id }),
    transitionToRecordEditor: () => transitionToRecordEditor({ id }),
  })),
  mapProps(props => ({
    items: [
      {
        action: props.transitionToRecordEditor,
        id: 'edit',
        label: 'Edit Adapter',
      },
      {
        action: () => {},
        id: 'operations',
      },
      {
        action: props.deleteRecord,
        id: 'delete',
        label: 'Delete Adapter',
        style: { color: colors.red50 },
      },
    ],
  })),
)(ActionsMenu);

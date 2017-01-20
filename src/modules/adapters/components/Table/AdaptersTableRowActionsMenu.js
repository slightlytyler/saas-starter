import colors from 'colors';
import ActionsMenu from 'components/ActionsMenu';
import withActions from 'containers/withActions';
import { compose } from 'lodash/fp';
import { mapProps } from 'recompose';
import { deleteRecord, transitionToRecordEditor, transitionToRecordViewer } from '../../actions';

export default compose(
  withActions(({ id }) => ({
    deleteRecord: () => deleteRecord({ id }),
    transitionToRecordEditor: () => transitionToRecordEditor({ id }),
    transitionToRecordViewer: () => transitionToRecordViewer({ id }),
  })),
  mapProps(props => ({
    items: [
      {
        action: props.transitionToRecordViewer,
        id: 'view',
      },
      {
        action: props.transitionToRecordEditor,
        id: 'edit',
      },
      {
        action: props.deleteRecord,
        id: 'delete',
        style: { color: colors.red50 },
      },
    ],
  })),
)(ActionsMenu);

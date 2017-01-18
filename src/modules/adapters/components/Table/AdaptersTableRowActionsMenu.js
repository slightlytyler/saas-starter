import colors from 'colors';
import ActionsMenu from 'components/ActionsMenu';
import { push } from 'connected-react-router';
import withActions from 'containers/withActions';
import { compose } from 'lodash/fp';
import { mapProps } from 'recompose';
import { deleteRecord } from '../../actions';

export default compose(
  withActions(({ id }) => ({
    deleteRecord: () => deleteRecord({ id }),
    transitionToEditor: () => push(`/adapters/${id}/edit`),
    transitionToViewer: () => push(`/adapters/${id}`),
  })),
  mapProps(props => ({
    items: [
      {
        action: props.transitionToViewer,
        id: 'view',
      },
      {
        action: props.transitionToEditor,
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

import colors from 'colors';
import ActionsMenu from 'components/ActionsMenu';
import withActions from 'containers/withActions';
import { compose } from 'lodash/fp';
import { mapProps } from 'recompose';
import * as actions from '../../actions';

export default compose(
  withActions({ onDelete: id => actions.deleteRecord({ id }) }),
  mapProps(props => ({
    items: [
      {
        action: () => props.onEdit(props.id),
        id: 'edit',
        label: 'Edit Adapter',
      },
      {
        action: () => props.onDelete(props.id),
        id: 'delete',
        label: 'Delete Adapter',
        style: { color: colors.red50 },
      },
    ],
  })),
)(ActionsMenu);

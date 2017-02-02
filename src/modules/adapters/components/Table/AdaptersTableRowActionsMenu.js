import colors from 'colors';
import ActionsMenu from 'common/components/ActionsMenu';
import { mapProps } from 'recompose';

const container = mapProps(props => ({
  items: [
    {
      action: props.onEdit,
      id: 'edit',
      label: 'Edit Adapter',
    },
    {
      action: props.onDelete,
      id: 'delete',
      label: 'Delete Adapter',
      style: { color: colors.red50 },
    },
  ],
}));

export default container(ActionsMenu);

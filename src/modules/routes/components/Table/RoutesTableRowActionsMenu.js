import colors from 'colors';
import ActionsMenu from 'common/components/ActionsMenu';
import { mapProps } from 'recompose';

const container = mapProps(props => ({
  items: [
    {
      action: props.onEdit,
      id: 'edit',
      label: 'Edit Route',
    },
    {
      action: props.onDelete,
      id: 'delete',
      label: 'Delete Route',
      style: { color: colors.red50 },
    },
  ],
}));

export default container(ActionsMenu);

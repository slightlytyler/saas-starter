import colors from 'colors';
import ActionsMenu from 'common/components/ActionsMenu';
import { mapProps } from 'recompose';

const container = mapProps(props => ({
  ...props,
  items: [
    {
      action: () => {}, id: 'edit', label: 'Edit Operation' },
    { action: () => {}, id: 'test', label: 'Test Operation' },
    {
      action: () => {},
      id: 'delete',
      label: 'Delete Operation',
      style: { color: colors.red50 },
    },
  ],
}));

export default container(ActionsMenu);

import ActionsMenu from 'common/components/ActionsMenu';
import { mapProps } from 'recompose';

const container = mapProps(props => {
  const baseItems = [
    {
      action: () => props.onViewAdapters(props.id),
      id: 'view-adapters',
      label: 'View Adapters',
    },
    {
      action: () => props.onViewRoutes(props.id),
      id: 'view-routes',
      label: 'View Routes',
    },
  ];
  const unregisteredItems = [
    {
      action: () => props.onResendInvite(props.id),
      id: 'resend-invite',
      label: 'Resend Invite',
    },
  ];
  const items = props.isRegistered ? baseItems : [...baseItems, ...unregisteredItems];
  return { items };
});

export default container(ActionsMenu);

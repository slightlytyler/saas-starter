import ActionsMenu from 'common/components/ActionsMenu';
import { mapProps } from 'recompose';

const container = mapProps(props => {
  const baseItems = [
    {
      action: props.onViewAdapters,
      id: 'view-adapters',
      label: 'View Adapters',
    },
    {
      action: props.onViewRoutes,
      id: 'view-routes',
      label: 'View Routes',
    },
  ];
  if (props.isRegistered) return { items: baseItems };
  const unregisteredItems = [
    {
      action: props.onResendInvite,
      id: 'resend-invite',
      label: 'Resend Invite',
    },
  ];
  return { items: [...baseItems, ...unregisteredItems] };
});

export default container(ActionsMenu);

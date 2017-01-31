import ActionsMenu from 'common/components/ActionsMenu';
import withActions from 'common/containers/withActions';
import { compose } from 'lodash/fp';
import { mapProps } from 'recompose';

export default compose(
  withActions({ }),
  mapProps(() => ({
    items: [
      {
        action: () => {},
        id: 'view-adapters',
        label: 'View Adapters',
      },
      {
        action: () => {},
        id: 'view-routes',
        label: 'View Routes',
      },
      {
        action: () => {},
        id: 'resend-invite',
        label: 'Resend Invite',
      },
    ],
  })),
)(ActionsMenu);

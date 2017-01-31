import ActionsMenu from 'common/components/ActionsMenu';
import withActions from 'common/containers/withActions';
import { compose } from 'lodash/fp';
import { mapProps } from 'recompose';
import * as actions from '../../actions';

export default compose(
  withActions({ resendInvite: actions.resendInvite }),
  mapProps(props => ({
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
        action: () => props.resendInvite({ email: props.email }),
        id: 'resend-invite',
        label: 'Resend Invite',
      },
    ],
  })),
)(ActionsMenu);

import withActions from 'common/containers/withActions';
import { compose } from 'lodash/fp';
import { logout } from 'modules/auth/actions';
import { withProps } from 'recompose';
import Nav from './SidebarNav';

export default compose(
  withActions({ logout }),
  withProps(props => ({
    items: [
      {
        icon: 'power_settings_new',
        onTouchTap: props.logout,
        value: 'logout',
      },
    ],
  })),
)(Nav);

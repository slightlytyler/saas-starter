import withActions from 'common/containers/withActions';
import { compose } from 'lodash/fp';
import { logout } from 'modules/auth/actions';
import { withProps } from 'recompose';
import Nav from './SidebarNav';

const container = compose(
  withActions({ logout }),
  withProps(props => ({
    ...props,
    items: [
      {
        icon: 'power_settings_new',
        onTouchTap: props.logout,
        value: 'logout',
      },
    ],
  })),
);

export default container(Nav);

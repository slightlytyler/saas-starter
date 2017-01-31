import withActions from 'common/containers/withActions';
import { push } from 'connected-react-router';
import { compose } from 'lodash/fp';
import { withProps } from 'recompose';
import Nav from './SidebarNav';

export default compose(
  withActions({
    transitionToAdapters: () => push('/adapters'),
    transitionToRoutes: () => push('/routes'),
    transitionToUsers: () => push('/users'),
    transitionToVendors: () => push('/vendors'),
  }),
  withProps(props => ({
    items: [
      {
        icon: 'group',
        onTouchTap: props.transitionToUsers,
        value: 'users',
      },
      {
        icon: 'settings_input_component',
        onTouchTap: props.transitionToAdapters,
        value: 'adapters',
      },
      {
        icon: 'store',
        onTouchTap: props.transitionToVendors,
        value: 'vendors',
      },
      {
        icon: 'device_hub',
        onTouchTap: props.transitionToRoutes,
        value: 'routes',
      },
    ],
  })),
)(Nav);

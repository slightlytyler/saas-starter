import connect from 'common/redux/connect';
import { compose } from 'lodash/fp';
import { selectIsAdmin } from 'modules/auth/selectors';
import { withProps } from 'recompose';
import Nav from './SidebarNav';

const container = compose(
  connect({ mapStateToProps: { isAdmin: selectIsAdmin } }),
  withProps(props => {
    const adminItems = [
      {
        icon: 'group',
        onTouchTap: () => props.push('/users'),
        value: 'users',
      },
    ];
    const baseItems = [
      {
        icon: 'settings_input_component',
        onTouchTap: () => props.push('/adapters'),
        value: 'adapters',
      },
      {
        icon: 'store',
        onTouchTap: () => props.push('/vendors'),
        value: 'vendors',
      },
      {
        icon: 'device_hub',
        onTouchTap: () => props.push('/routes'),
        value: 'routes',
      },
    ];
    const items = props.isAdmin ? [...adminItems, ...baseItems] : baseItems;
    return { ...props, items };
  }),
);

export default container(Nav);

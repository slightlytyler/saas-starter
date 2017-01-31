import { withProps } from 'recompose';
import Nav from './SidebarNav';

const container = withProps(props => ({
  ...props,
  items: [
    {
      icon: 'group',
      onTouchTap: () => props.push('/users'),
      value: 'users',
    },
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
  ],
}));

export default container(Nav);

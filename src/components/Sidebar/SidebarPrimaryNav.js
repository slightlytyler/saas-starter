import { push } from 'connected-react-router';
import withActions from 'containers/withActions';
import withLocation from 'containers/withLocation';
import { capitalize, compose, get, head, map, split, trimChars } from 'lodash/fp';
import { FontIcon, List, ListItem, makeSelectable } from 'material-ui';
import React, { PropTypes } from 'react';
import { withProps } from 'recompose';

const SelectableList = makeSelectable(List);

const getValueFromLocation = compose(head, split('/'), trimChars('/'), get('pathname'));

// eslint-disable-next-line react/prop-types
const renderItem = ({ icon, onTouchTap, value }) => (
  <ListItem
    key={value}
    leftIcon={<FontIcon className="material-icons">{icon}</FontIcon>}
    onTouchTap={onTouchTap}
    primaryText={capitalize(value)}
    value={value}
  />
);

const SidebarPrimaryNav = ({ items, location }) => (
  <SelectableList style={{ width: '100%' }} value={getValueFromLocation(location)}>
    {map(renderItem, items)}
  </SelectableList>
);

SidebarPrimaryNav.propTypes = {
  items: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

const container = compose(
  withActions({
    transitionToAdapters: () => push('/adapters'),
    transitionToRoutes: () => push('/routes'),
    transitionToUsers: () => push('/users'),
    transitionToVendors: () => push('/vendors'),
  }),
  withLocation,
  withProps(props => ({
    items: [
      {
        icon: 'group',
        onTouchTap: props.transitionToUsers,
        value: 'users',
      },
      {
        icon: 'code',
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
);

export { SidebarPrimaryNav as component, container };

export default container(SidebarPrimaryNav);

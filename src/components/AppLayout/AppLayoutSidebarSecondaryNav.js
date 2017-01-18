import withActions from 'containers/withActions';
import { capitalize, compose, map } from 'lodash/fp';
import { FontIcon, List, ListItem } from 'material-ui';
import { logout } from 'modules/auth/actions';
import React, { PropTypes } from 'react';
import { withProps } from 'recompose';

// eslint-disable-next-line react/prop-types
const renderItem = ({ icon, onTouchTap, value }) => (
  <ListItem
    key={value}
    leftIcon={<FontIcon className="material-icons">{icon}</FontIcon>}
    onTouchTap={onTouchTap}
    primaryText={capitalize(value)}
  />
);

const AppLayoutSidebarSecondaryNav = ({ items }) => (
  <List style={{ width: '100%' }}>
    {map(renderItem, items)}
  </List>
);

AppLayoutSidebarSecondaryNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      onTouchTap: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const container = compose(
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
);

export { AppLayoutSidebarSecondaryNav as component, container };

export default container(AppLayoutSidebarSecondaryNav);

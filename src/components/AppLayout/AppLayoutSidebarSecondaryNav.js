import ActionsProvider from 'components/ActionsProvider';
import { FontIcon, List, ListItem } from 'material-ui';
import { logout } from 'modules/auth/actions';
import React from 'react';

const AppLayoutSidebarSecondaryNav = () => (
  <ActionsProvider creators={{ logout }}>
    {({ actions }) => (
      <List style={{ width: '100%' }}>
        <ListItem
          leftIcon={<FontIcon className="material-icons">power_settings_new</FontIcon>}
          onTouchTap={actions.logout}
          primaryText="Logout"
        />
      </List>
    )}
  </ActionsProvider>
);

export default AppLayoutSidebarSecondaryNav;

import ActionsProvider from 'components/ActionsProvider';
import LocationSelector from 'components/LocationSelector';
import { push } from 'connected-react-router';
import { compose, get, head, split, trimChars } from 'lodash/fp';
import { FontIcon, List, ListItem, makeSelectable } from 'material-ui';
import React from 'react';

const SelectableList = makeSelectable(List);

const getValueFromLocation = compose(head, split('/'), trimChars('/'), get('pathname'));

const transitionToAdapters = () => push('/adapters');

const transitionToRoutes = () => push('/routes');

const transitionToUsers = () => push('/users');

const transitionToVendors = () => push('/vendors');

const AppLayoutSidebarMainNav = () => (
  <ActionsProvider
    creators={{
      transitionToAdapters,
      transitionToRoutes,
      transitionToUsers,
      transitionToVendors,
    }}
  >
    {({ actions }) => (
      <LocationSelector>
        {({ location }) => (
          <SelectableList style={{ width: '100%' }} value={getValueFromLocation(location)}>
            <ListItem
              leftIcon={<FontIcon className="material-icons">group</FontIcon>}
              onTouchTap={actions.transitionToUsers}
              primaryText="Users"
              value="users"
            />
            <ListItem
              leftIcon={<FontIcon className="material-icons">code</FontIcon>}
              onTouchTap={actions.transitionToAdapters}
              primaryText="Adapters"
              value="adapters"
            />
            <ListItem
              leftIcon={<FontIcon className="material-icons">device_hub</FontIcon>}
              onTouchTap={actions.transitionToVendors}
              primaryText="Vendors"
              value="vendors"
            />
            <ListItem
              leftIcon={<FontIcon className="material-icons">store</FontIcon>}
              onTouchTap={actions.transitionToRoutes}
              primaryText="routes"
            />
          </SelectableList>
        )}
      </LocationSelector>
    )}
  </ActionsProvider>
);

export default AppLayoutSidebarMainNav;

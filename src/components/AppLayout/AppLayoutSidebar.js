import Logo from 'components/Logo';
import { Divider, FontIcon, List, ListItem, Paper } from 'material-ui';
import React from 'react';
import { Box, Flex } from 'react-layout-components';

const AppLayoutSidebar = () => (
  <Box className="AppLayoutSidebar" column>
    <Paper className="AppLayoutSidebar__wrapper" zDepth={1}>
      <Flex column fit>
        <Box center className="AppLayoutSidebar__header">
          <Logo className="AppLayoutSidebar__logo" inverted />
        </Box>
        <Flex>
          <List style={{ width: '100%' }}>
            <ListItem
              leftIcon={<FontIcon className="material-icons">group</FontIcon>}
              primaryText="Users"
            />
            <ListItem
              leftIcon={<FontIcon className="material-icons">code</FontIcon>}
              primaryText="Adapters"
            />
            <ListItem
              leftIcon={<FontIcon className="material-icons">device_hub</FontIcon>}
              primaryText="Vendors"
            />
            <ListItem
              leftIcon={<FontIcon className="material-icons">store</FontIcon>}
              primaryText="Routes"
            />
          </List>
        </Flex>
        <Divider />
        <List>
          <ListItem
            leftIcon={<FontIcon className="material-icons">power_settings_new</FontIcon>}
            primaryText="Logout"
          />
        </List>
      </Flex>
    </Paper>
  </Box>
);

export default AppLayoutSidebar;

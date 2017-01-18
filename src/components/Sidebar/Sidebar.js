import { Divider, Paper } from 'material-ui';
import React from 'react';
import { Box, Flex } from 'react-layout-components';
import Header from './SidebarHeader';
import PrimaryNav from './SidebarPrimaryNav';
import SecondaryNav from './SidebarSecondaryNav';

const Sidebar = () => (
  <Box className="Sidebar" column>
    <Paper className="Sidebar__wrapper" zDepth={1}>
      <Flex column fit>
        <Header />
        <Flex>
          <PrimaryNav />
        </Flex>
        <Divider />
        <SecondaryNav />
      </Flex>
    </Paper>
  </Box>
);

export default Sidebar;

import { Divider, Paper } from 'material-ui';
import React from 'react';
import { Box, Flex } from 'react-layout-components';
import Header from './AppLayoutSidebarHeader';
import PrimaryNav from './AppLayoutSidebarPrimaryNav';
import SecondaryNav from './AppLayoutSidebarSecondaryNav';

const AppLayoutSidebar = () => (
  <Box className="AppLayoutSidebar" column>
    <Paper className="AppLayoutSidebar__wrapper" zDepth={1}>
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

export default AppLayoutSidebar;

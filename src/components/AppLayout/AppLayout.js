import React, { PropTypes } from 'react';
import { Box, Page } from 'react-layout-components';
import CopyrightFooter from '../CopyrightFooter';
import Sidebar from '../Sidebar';

const AppLayout = ({ children }) => (
  <Page>
    <Box fit>
      <Sidebar />
      <Box column flex="1">
        <Box column flex="1" style={{ padding: '16px' }}>
          {children}
        </Box>
        <CopyrightFooter />
      </Box>
    </Box>
  </Page>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

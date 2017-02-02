import React, { PropTypes } from 'react';
import { Box, Page, ScrollView } from 'react-layout-components';
import CopyrightFooter from '../CopyrightFooter';
import Sidebar from '../Sidebar';

const AppLayout = ({ children }) => (
  <Page>
    <Box fit>
      <Sidebar />
      <Box column flex="1">
        <ScrollView flex="1" style={{ padding: '1em 3em 2em' }}>
          {children}
        </ScrollView>
        <CopyrightFooter />
      </Box>
    </Box>
  </Page>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

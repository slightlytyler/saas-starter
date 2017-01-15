import React, { PropTypes } from 'react';
import { Box, Flex, Page } from 'react-layout-components';
import Content from './AppLayoutContent';
import Footer from './AppLayoutFooter';
import Sidebar from './AppLayoutSidebar';

const AppLayout = ({ children }) => (
  <Page>
    <Box column fit>
      <Content>
        <Sidebar />
        <Flex column>
          <Flex style={{ padding: '16px' }}>
            {children}
          </Flex>
          <Footer />
        </Flex>
      </Content>
    </Box>
  </Page>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

import React, { PropTypes } from 'react';
import { Box, Page, ScrollView } from 'react-layout-components';

const AppLayout = ({ children }) => (
  <Page>
    <Box fit>
      <Box column flex="1">
        <ScrollView flex="1" style={{ padding: '1em 3em 2em' }}>
          {children}
        </ScrollView>
      </Box>
    </Box>
  </Page>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

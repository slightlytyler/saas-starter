import AuthenticationButton from 'modules/auth/components/AuthenticationButton';
import React, { PropTypes } from 'react';
import { Box, Page, ScrollView } from 'react-layout-components';
import * as colors from 'styles/colors';

const AppLayout = ({ children }) => (
  <Page>
    <ScrollView fit>
      <Box
        alignItems="center"
        justifyContent="space-between"
        style={{
          backgroundColor: colors.grey20,
          left: 0,
          top: 0,
          height: '3em',
          padding: '0 16px',
          position: 'absolute',
          width: '100%',
          zIndex: 1000,
        }}
      >
        <div>Logo</div>
        <AuthenticationButton />
      </Box>
      <div style={{ paddingBottom: '2em', paddingTop: '5em' }}>
        {children}
      </div>
    </ScrollView>
  </Page>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

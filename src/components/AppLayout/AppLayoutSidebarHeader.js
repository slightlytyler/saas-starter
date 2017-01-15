import ActionsProvider from 'components/ActionsProvider';
import Logo from 'components/Logo';
import { push } from 'connected-react-router';
import React from 'react';
import { Box } from 'react-layout-components';

const transitionToHome = () => push('/');

const AppLayoutSidebarHeader = () => (
  <ActionsProvider creators={{ transitionToHome }}>
    {({ actions }) => (
      <Box center className="AppLayoutSidebarHeader" onTouchTap={actions.transitionToHome}>
        <Logo className="AppLayoutSidebar__logo" inverted />
      </Box>
    )}
  </ActionsProvider>
);

export default AppLayoutSidebarHeader;

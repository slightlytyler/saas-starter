import logo from 'assets/images/logo--invert.png';
import ActionsProvider from 'components/ActionsProvider';
import { push } from 'connected-react-router';
import { AppBar, FlatButton } from 'material-ui';
import { logout } from 'modules/auth/actions';
import React from 'react';
import { Box } from 'react-layout-components';

const transitionToHome = () => push('/');

const AppLayoutHeader = () => (
  <ActionsProvider creators={{ logout, transitionToHome }}>
    {({ actions }) => (
      <AppBar
        className="AppLayoutHeader"
        iconElementRight={
          <FlatButton
            label="Logout"
            onTouchTap={actions.logout}
          />
        }
        iconStyleLeft={{ display: 'none' }}
        onTitleTouchTap={actions.transitionToHome}
        title={
          <Box center className="AppLayoutHeader__logo">
            <img alt="home" className="image" src={logo} />
          </Box>
        }
      />
    )}
  </ActionsProvider>
);

export default AppLayoutHeader;

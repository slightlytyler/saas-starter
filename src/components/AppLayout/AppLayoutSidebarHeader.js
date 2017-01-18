import Logo from 'components/Logo';
import { push } from 'connected-react-router';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import withActions from 'containers/withActions';

const transitionToHome = () => push('/');

const AppLayoutSidebarHeader = ({ onTouchTap }) => (
  <Box center className="AppLayoutSidebarHeader" onTouchTap={onTouchTap}>
    <Logo className="AppLayoutSidebar__logo" inverted />
  </Box>
);

AppLayoutSidebarHeader.propTypes = {
  onTouchTap: PropTypes.func.isRequired,
};

export default withActions({
  onTouchTap: transitionToHome,
})(AppLayoutSidebarHeader);

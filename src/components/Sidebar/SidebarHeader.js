import transitionToRoot from 'common/actions/transitionToRoot';
import Logo from 'components/Logo';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import withActions from 'containers/withActions';

const SidebarHeader = ({ onTouchTap }) => (
  <Box center className="SidebarHeader" onTouchTap={onTouchTap}>
    <Logo inverted />
  </Box>
);

SidebarHeader.propTypes = {
  onTouchTap: PropTypes.func.isRequired,
};

export default withActions({
  onTouchTap: transitionToRoot,
})(SidebarHeader);

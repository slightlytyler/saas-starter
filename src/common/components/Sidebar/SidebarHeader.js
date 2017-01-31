import Logo from 'common/components/Logo';
import React from 'react';
import { Box } from 'react-layout-components';

const SidebarHeader = props => (
  <Box {...props} center className="SidebarHeader">
    <Logo inverted />
  </Box>
);

export default SidebarHeader;

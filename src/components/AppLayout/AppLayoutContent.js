import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';

const AppLayoutContent = ({ children }) => (
  <Box className="AppLayoutContent">
    {children}
  </Box>
);

AppLayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayoutContent;

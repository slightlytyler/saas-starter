import React from 'react';
import { Box } from 'react-layout-components';

const currentYear = new Date().getFullYear();

const CopyrightFooter = () => (
  <Box center className="CopyrightFooter">
    <span className="CopyrightFooter__text">
      paep © {currentYear}
    </span>
  </Box>
);

export default CopyrightFooter;

import { CircularProgress } from 'material-ui';
import React from 'react';
import { Box } from 'react-layout-components';

const Spinner = () => (
  <Box center fit>
    <CircularProgress size={100} thickness={10} />
  </Box>
);

export default Spinner;

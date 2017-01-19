import { CircularProgress } from 'material-ui';
import React from 'react';
import { Box, Page } from 'react-layout-components';

const Spinner = () => (
  <Page>
    <Box center fit>
      <CircularProgress size={100} thickness={10} />
    </Box>
  </Page>
);

export default Spinner;

import { Paper } from 'material-ui';
import React from 'react';
import { Box } from 'react-layout-components';

const NoMatch = () => (
  <Box center fit>
    <Paper style={{ padding: '16px' }}>
      404 no match found :(
    </Paper>
  </Box>
);

export default NoMatch;

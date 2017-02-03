import { RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';

const OperationsCollectionViewerEmptyState = ({ onCreate }) => (
  <Box center column style={{ padding: '16px' }}>
    <Box style={{ marginBottom: '1rem' }}>No operations found.</Box>
    <RaisedButton
      label="Add Operation"
      onTouchTap={onCreate}
      primary
    />
  </Box>
);

OperationsCollectionViewerEmptyState.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default OperationsCollectionViewerEmptyState;

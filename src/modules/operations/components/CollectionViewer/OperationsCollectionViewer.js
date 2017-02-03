import { size } from 'lodash/fp';
import { RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import EmptyState from './OperationsCollectionViewerEmptyState';
import List from '../List';

const OperationsCollectionViewer = ({ ids = [], onCreate }) => {
  if (!size(ids)) return <EmptyState onCreate={onCreate} />;
  return (
    <Box column>
      <List ids={ids} />
      <Box style={{ padding: '16px' }}>
        <RaisedButton
          label="Add Operation"
          onTouchTap={onCreate}
          primary
        />
      </Box>
    </Box>
  );
};

OperationsCollectionViewer.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default OperationsCollectionViewer;

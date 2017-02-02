import { map, size } from 'lodash/fp';
import { List, RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import EmptyState from './OperationsListEmptyState';
import Item from './OperationsListItem';

const OperationsList = ({ ids = [], onCreate }) => {
  if (!size(ids)) return <EmptyState onCreate={onCreate} />;
  return (
    <Box column>
      <List>
        {map(id => <Item id={id} />, ids)}
      </List>
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

OperationsList.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default OperationsList;

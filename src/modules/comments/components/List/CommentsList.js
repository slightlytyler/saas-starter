import { map } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import Item from '../Item';

const CommentsList = props => (
  <Box column>
    {map(record => <Item key={record.id} record={record} />, props.records)}
  </Box>
);

CommentsList.propTypes = {
  records: PropTypes.array.isRequired,
};

export default CommentsList;

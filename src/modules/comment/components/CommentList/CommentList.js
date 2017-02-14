import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';

const CommentList = props => (
  <Box column>{props.children}</Box>
);

CommentList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommentList;

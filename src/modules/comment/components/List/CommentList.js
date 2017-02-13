import { map } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import Item from '../Item';

const CommentList = props => (
  <Box column>
    {map(comment => <Item comment={comment} key={comment.id} />, props.comments)}
  </Box>
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentList;

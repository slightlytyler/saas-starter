import { map } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import Item from '../Item';

const PostsList = ({ posts, ...handlers }) => (
  <Box column>
    {map(post => <Item key={post.id} post={post} {...handlers} />, posts)}
  </Box>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostsList;

import { propType } from 'graphql-anywhere';
import { map } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import PostItem from '../PostItem';
import * as fragments from '../../fragments';

const PostList = ({ posts, ...handlers }) => (
  <Box column>
    {map(post => <PostItem key={post.id} post={post} {...handlers} />, posts)}
  </Box>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(propType(fragments.PostObject)).isRequired,
};

export default PostList;

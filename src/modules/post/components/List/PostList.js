import { propType } from 'graphql-anywhere';
import { map } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import Item from '../Item';
import * as fragments from '../../fragments';

const PostList = ({ posts, ...handlers }) => (
  <Box column>
    {map(post => <Item key={post.id} post={post} {...handlers} />, posts)}
  </Box>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(propType(fragments.PostObject)).isRequired,
};

export default PostList;

import { propType } from 'graphql-anywhere';
import AuthenticatedRoute from 'modules/auth/components/AuthenticatedRoute';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import PostCreator from '../PostCreator';
import PostList from '../PostList';
import * as fragments from '../../fragments';

const PostFeed = props => (
  <Box column justifyContent="flex-start" style={{ width: '45em' }}>
    <AuthenticatedRoute renderLeft={() => <PostCreator onSubmit={props.onCreatePost} />} />
    <PostList
      onDeletePost={props.onDeletePost}
      onUpdatePost={props.onUpdatePost}
      posts={props.posts}
    />
  </Box>
);

PostFeed.propTypes = {
  onCreatePost: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired,
  onUpdatePost: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(propType(fragments.PostObject)).isRequired,
};

export default PostFeed;

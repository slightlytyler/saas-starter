import spinnerWhile from 'common/containers/spinnerWhile';
import findObjectIndex from 'common/data/findObjectIndex';
import { propType } from 'graphql-anywhere';
import update from 'immutability-helper';
import { compose, get } from 'lodash/fp';
import AuthenticatedRoute from 'modules/auth/components/AuthenticatedRoute';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import GroupList from 'modules/group/components/GroupList';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Box } from 'react-layout-components';
import generateId from 'shortid';
import PostCreator from '../PostCreator';
import PostList from '../PostList';
import * as fragments from '../../fragments';
import * as mutations from '../../mutations';
import * as queries from '../../queries';

const PostFeed = props => (
  <Box alignItems="flex-start" fit justifyContent="center">
    <GroupList />
    <Box column justifyContent="flex-start" style={{ width: '45em' }}>
      <AuthenticatedRoute renderLeft={() => <PostCreator onSubmit={props.onCreatePost} />} />
      <PostList
        onDeletePost={props.onDeletePost}
        onUpdatePost={props.onUpdatePost}
        posts={props.posts}
      />
    </Box>
  </Box>
);

PostFeed.propTypes = {
  onCreatePost: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired,
  onUpdatePost: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(propType(fragments.PostObject)).isRequired,
};

const container = compose(
  withCurrentUser,
  graphql(queries.GroupFeed, {
    props: ({ data }) => ({
      currentGroup: data.Group,
      loading: data.loading,
      posts: get('posts', data.Group),
    }),
    options: props => ({
      returnPartialData: true,
      variables: { slug: props.match.params.groupSlug },
    }),
  }),
  graphql(mutations.CreatePost, {
    props: ({ mutate, ownProps }) => ({
      onCreatePost: data => mutate({
        optimisticResponse: {
          __typename: 'Mutation',
          createPost: {
            __typename: 'Post',
            id: generateId(),
            ...data,
            author: ownProps.currentUser,
            createdAt: new Date().toISOString(),
            group: ownProps.currentGroup,
          },
        },
        updateQueries: {
          GroupFeed: (prev, { mutationResult }) => update(prev, {
            Group: {
              posts: {
                $unshift: [mutationResult.data.createPost],
              },
            },
          }),
        },
        variables: {
          ...data,
          authorId: ownProps.currentUser.id,
          groupId: ownProps.currentGroup.id,
        },
      }),
    }),
  }),
  graphql(mutations.DeletePost, {
    props: ({ mutate }) => ({
      onDeletePost: data => mutate({
        optimisticResponse: {
          __typename: 'Mutation',
          deletePost: {
            __typename: 'Post',
            id: data.id,
          },
        },
        updateQueries: {
          GlobalFeed: prev => update(prev, {
            allPosts: {
              $splice: [[findObjectIndex(data.id, prev.allPosts), 1]],
            },
          }),
        },
        variables: data,
      }),
    }),
  }),
  graphql(mutations.UpdatePost, {
    props: ({ mutate }) => ({
      onUpdatePost: data => mutate({
        optimisticResponse: {
          __typename: 'Mutation',
          updatePost: {
            __typename: 'Post',
            ...data,
          },
        },
        variables: data,
      }),
    }),
  }),
  compose(spinnerWhile, get)('loading'),
);

export default container(PostFeed);

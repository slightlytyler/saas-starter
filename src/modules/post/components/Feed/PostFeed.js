import spinnerWhile from 'common/containers/spinnerWhile';
import findObjectIndex from 'common/data/findObjectIndex';
import { propType } from 'graphql-anywhere';
import update from 'immutability-helper';
import { compose, get } from 'lodash/fp';
import AuthenticatedRoute from 'modules/auth/components/AuthenticatedRoute';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Box } from 'react-layout-components';
import generateId from 'shortid';
import Creator from '../Creator';
import List from '../List';
import * as fragments from '../../fragments';
import * as mutations from '../../mutations';
import * as queries from '../../queries';

const PostFeed = props => (
  <Box alignItems="center" column fit>
    <Box column style={{ width: '45em' }}>
      <AuthenticatedRoute leftRender={() => <Creator onSubmit={props.onCreatePost} />} />
      <List
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
          },
        },
        updateQueries: {
          GlobalFeed: (prev, { mutationResult }) => update(prev, {
            allPosts: {
              $unshift: [mutationResult.data.createPost],
            },
          }),
        },
        variables: {
          ...data,
          authorId: ownProps.currentUser.id,
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
  graphql(queries.GlobalFeed, {
    options: { returnPartialData: true },
    props: ({ data }) => ({
      loading: data.loading,
      posts: data.allPosts,
    }),
  }),
  compose(spinnerWhile, get)('loading'),
);


export default container(PostFeed);

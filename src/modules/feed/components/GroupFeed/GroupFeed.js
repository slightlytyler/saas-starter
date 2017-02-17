import spinnerWhile from 'common/containers/spinnerWhile';
import findObjectIndex from 'common/data/findObjectIndex';
import update from 'immutability-helper';
import { compose, get } from 'lodash/fp';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import PostFeed from 'modules/post/components/PostFeed';
import { graphql } from 'react-apollo';
import generateId from 'shortid';
import * as mutations from 'modules/post/mutations';
import * as queries from 'modules/post/queries';

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
          GroupFeed: prev => update(prev, {
            Group: {
              posts: {
                $splice: [[findObjectIndex(data.id, prev.Group.posts), 1]],
              },
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

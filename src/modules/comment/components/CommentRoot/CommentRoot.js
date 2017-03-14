import spinnerWhile from 'common/containers/spinnerWhile';
import findObjectIndex from 'common/data/findObjectIndex';
import { propType } from 'graphql-anywhere';
import update from 'immutability-helper';
import { compose, get, map } from 'lodash/fp';
import AuthenticatedRoute from 'modules/auth/components/AuthenticatedRoute';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Box } from 'react-layout-components';
import { setPropTypes } from 'recompose';
import generateId from 'shortid';
import * as colors from 'styles/colors';
import CommentCreator from '../CommentCreator';
import CommentItem from '../CommentItem';
import CommentList from '../CommentList';
import * as fragments from '../../fragments';
import * as mutations from '../../mutations';
import * as queries from '../../queries';

const CommentRoot = props => (
  <Box column style={{ backgroundColor: colors.white4, padding: '16px' }}>
    <AuthenticatedRoute
      renderLeft={() => <CommentCreator onSubmit={props.onCreate} />}
    />
    <CommentList>
      {map(
        comment => (
          <CommentItem
            comment={comment}
            key={comment.id}
            onDelete={props.onDelete}
          />
        ),
        props.comments,
      )}
    </CommentList>
  </Box>
);

CommentRoot.propTypes = {
  comments: PropTypes.arrayOf(propType(fragments.CommentObject)).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const container = compose(
  setPropTypes({
    postId: PropTypes.string.isRequired,
  }),
  withCurrentUser,
  graphql(mutations.CreateComment, {
    props: ({ mutate, ownProps }) => ({
      onCreate: body => mutate({
        optimisticResponse: {
          __typename: 'Mutation',
          createComment: {
            __typename: 'Comment',
            id: generateId(),
            author: ownProps.currentUser,
            body,
            createdAt: new Date().toISOString(),
            parentComment: null,
            parentPost: {
              id: ownProps.postId,
            },
          },
        },
        updateQueries: {
          CommentsOnPost: (prev, { mutationResult, queryVariables }) => {
            if (queryVariables.postId !== ownProps.postId) return null;
            return update(prev, {
              allComments: { $push: [mutationResult.data.createComment] },
            });
          },
        },
        variables: {
          authorId: ownProps.currentUser.id,
          body,
          parentPostId: ownProps.postId,
        },
      }),
    }),
  }),
  graphql(mutations.DeleteComment, {
    props: ({ mutate }) => ({
      onDelete: data => mutate({
        optimisticResponse: {
          __typename: 'Mutation',
          deleteComment: {
            __typename: 'Comment',
            id: data.id,
          },
        },
        updateQueries: {
          CommentsOnPost: (prev, { queryVariables }) => {
            if (queryVariables.postId !== data.parentPost.id) return null;
            return update(prev, {
              allComments: {
                $splice: [[findObjectIndex(data.id, prev.allComments), 1]],
              },
            });
          },
        },
        variables: { id: data.id },
      }),
    }),
  }),
  graphql(mutations.UpdateComment, {
    props: ({ mutate }) => ({
      onUpdate: data => mutate({
        variables: data,
      }),
    }),
  }),
  graphql(queries.CommentsOnPost, {
    options: ({ postId }) => ({
      variables: { postId },
    }),
    props: ({ data }) => ({
      comments: data.allComments,
      loading: data.loading,
    }),
  }),
  compose(spinnerWhile, get)('loading'),
);

export default container(CommentRoot);

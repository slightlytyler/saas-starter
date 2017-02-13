import MultiLineText from 'common/components/MultiLineText';
import Timestamp from 'common/components/Timestamp';
import findObjectIndex from 'common/data/findObjectIndex';
import update from 'immutability-helper';
import { capitalize, compose, first, get } from 'lodash/fp';
import { Avatar, Divider, Paper } from 'material-ui';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import Comments from 'modules/comments/components/Root';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Box } from 'react-layout-components';
import { mapProps, withState } from 'recompose';
import AuthorMenu from './PostsItemAuthorMenu';
import ReaderMenu from './PostsItemReaderMenu';
import Editor from '../Editor';
import * as mutations from '../../mutations';

const PostsItem = props => (
  <Paper style={{ marginTop: '16px' }}>
    <Box column style={{ padding: '16px' }}>
      <Box
        alignItems="flex-start"
        justifyContent="space-between"
        style={{ marginBottom: '6px' }}
      >
        <Box alignItems="center">
          <Avatar>{compose(capitalize, first)(props.post.author.name)}</Avatar>
          <Box column style={{ marginLeft: '16px' }}>
            <div>{props.post.author.name}</div>
            <Timestamp>{props.post.createdAt}</Timestamp>
          </Box>
        </Box>
        {props.post.author.id === get('id', props.currentUser)
          ? <AuthorMenu onDelete={props.onDelete} onEdit={props.onEditStart} />
          : <ReaderMenu />
        }
      </Box>
      {props.isEditing
        ? <Editor
          defaultValue={props.post}
          onSubmit={data => {
            props.onEditEnd();
            props.onUpdate(data);
          }}
        />
        : <MultiLineText>{props.post.body}</MultiLineText>
      }
      <Divider style={{ marginTop: '6px' }} />
    </Box>
    <Divider />
    <Comments postId={props.post.id} />
  </Paper>
);

PostsItem.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  isEditing: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEditEnd: PropTypes.func.isRequired,
  onEditStart: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  post: PropTypes.shape({
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

PostsItem.defaultProps = {
  currentUser: null,
};

const container = compose(
  withCurrentUser,
  graphql(mutations.DeletePost, {
    props: ({ mutate, ownProps }) => ({
      onDelete: () => mutate({
        optimisticResponse: {
          __typename: 'Mutation',
          deletePost: {
            __typename: 'Post',
            id: ownProps.post.id,
          },
        },
        updateQueries: {
          GlobalFeed: prev => update(prev, {
            allPosts: {
              $splice: [[findObjectIndex(ownProps.post.id, prev.allPosts), 1]],
            },
          }),
        },
        variables: { id: ownProps.post.id },
      }),
    }),
  }),
  graphql(mutations.UpdatePost, {
    props: ({ mutate, ownProps }) => ({
      onUpdate: data => mutate({
        optimisticResponse: {
          __typename: 'Mutation',
          updatePost: {
            __typename: 'Post',
            ...ownProps.post,
            ...data,
          },
        },
        variables: { id: ownProps.post.id, ...data },
      }),
    }),
  }),
  withState('isEditing', 'setEditing', false),
  mapProps(props => ({
    currentUser: props.currentUser,
    isEditing: props.isEditing,
    onDelete: props.onDelete,
    onEditStart: () => setTimeout(() => props.setEditing(true), 800),
    onEditEnd: () => props.setEditing(false),
    onUpdate: props.onUpdate,
    post: props.post,
  })),
);

export default container(PostsItem);

import MultiLineText from 'common/components/MultiLineText';
import Timestamp from 'common/components/Timestamp';
import update from 'immutability-helper';
import { capitalize, compose, eq, findIndex, first, get } from 'lodash/fp';
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

// eslint-disable-next-line react/prop-types
const renderBody = ({ text }) => <MultiLineText>{text}</MultiLineText>;

// eslint-disable-next-line react/prop-types
const renderEditor = ({ defaultValue, onSubmit }) => (
  <Editor defaultValue={defaultValue} onSubmit={onSubmit} />
);

const PostsItem = props => (
  <Paper style={{ marginTop: '16px' }}>
    <Box column style={{ padding: '16px' }}>
      <Box
        alignItems="flex-start"
        justifyContent="space-between"
        style={{ marginBottom: '6px' }}
      >
        <Box alignItems="center">
          <Avatar>{compose(capitalize, first)(props.record.author.name)}</Avatar>
          <Box column style={{ marginLeft: '16px' }}>
            <div>{props.record.author.name}</div>
            <Timestamp>{props.record.createdAt}</Timestamp>
          </Box>
        </Box>
        {props.record.author.id === get('id', props.currentUser)
          ? <AuthorMenu onDelete={props.onDelete} onEdit={props.onEditStart} />
          : <ReaderMenu />
        }
      </Box>
      {props.isEditing
        ? renderEditor({
          defaultValue: props.record,
          onSubmit: data => {
            props.onEditEnd();
            props.onUpdate(data);
          },
        })
        : renderBody({ text: props.record.body })
      }
      <Divider style={{ marginTop: '6px' }} />
    </Box>
    <Divider />
    <Comments
      parentPostId={props.record.id}
      records={props.record.comments}
    />
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
  record: PropTypes.shape({
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
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
            id: ownProps.record.id,
          },
        },
        updateQueries: {
          GlobalFeed: prev => update(prev, {
            allPosts: {
              $splice: [[findIndex(compose(eq(ownProps.record.id), get('id')), prev.allPosts), 1]],
            },
          }),
        },
        variables: { id: ownProps.record.id },
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
            ...ownProps.record,
            ...data,
          },
        },
        variables: { id: ownProps.record.id, ...data },
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
    record: props.record,
  })),
);

export default container(PostsItem);

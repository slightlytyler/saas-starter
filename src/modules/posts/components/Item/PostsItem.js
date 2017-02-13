import MultiLineText from 'common/components/MultiLineText';
import Timestamp from 'common/components/Timestamp';
import { capitalize, compose, first } from 'lodash/fp';
import { Avatar, Divider, Paper } from 'material-ui';
import OwnedRoute from 'modules/auth/components/OwnedRoute';
import Comments from 'modules/comments/components/Root';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { mapProps, withState } from 'recompose';
import AuthorMenu from './PostsItemAuthorMenu';
import ReaderMenu from './PostsItemReaderMenu';
import Editor from '../Editor';

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
        <OwnedRoute
          leftRender={() => (
            <AuthorMenu
              onDeletePost={() => props.onDeletePost(props.post)}
              onEditPost={props.onEditPostStart}
            />
          )}
          rightRender={() => <ReaderMenu />}
          userId={props.post.author.id}
        />
      </Box>
      {props.isEditingPost
        ? <Editor
          defaultValue={props.post}
          onSubmit={data => {
            props.onEditPostEnd();
            props.onUpdatePost(data);
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
  isEditingPost: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onDeletePost: PropTypes.func.isRequired,
  onEditPostEnd: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onEditPostStart: PropTypes.func.isRequired,
  onUpdatePost: PropTypes.func.isRequired,
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

const container = compose(
  withState('isEditingPost', 'setEditingPost', false),
  mapProps(props => ({
    ...props,
    onEditPostStart: () => setTimeout(() => props.setEditingPost(true), 800),
    onEditPostEnd: () => props.setEditingPost(false),
  })),
);

export default container(PostsItem);

import MultiLineText from 'common/components/MultiLineText';
import Timestamp from 'common/components/Timestamp';
import { capitalize, compose, first, get } from 'lodash/fp';
import { Avatar, Divider, Paper } from 'material-ui';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
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
        {props.post.author.id === get('id', props.currentUser)
          ? <AuthorMenu onDeletePost={props.onDeletePost} onEditPost={props.onEditPostStart} />
          : <ReaderMenu />
        }
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
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  isEditingPost: PropTypes.bool.isRequired,
  onDeletePost: PropTypes.func.isRequired,
  onEditPostEnd: PropTypes.func.isRequired,
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

PostsItem.defaultProps = {
  currentUser: null,
};

const container = compose(
  withCurrentUser,
  withState('isEditingPost', 'setEditingPost', false),
  mapProps(props => ({
    ...props,
    onEditPostStart: () => setTimeout(() => props.setEditingPost(true), 800),
    onEditPostEnd: () => props.setEditingPost(false),
  })),
);

export default container(PostsItem);

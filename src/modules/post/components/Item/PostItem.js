import Branch from 'common/components/Branch';
import MultiLineText from 'common/components/MultiLineText';
import Timestamp from 'common/components/Timestamp';
import { propType } from 'graphql-anywhere';
import { compose } from 'lodash/fp';
import { Divider, Paper } from 'material-ui';
import OwnedRoute from 'modules/auth/components/OwnedRoute';
import CommentRoot from 'modules/comment/components/Root';
import UserAvatar from 'modules/user/components/Avatar';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { mapProps, withState } from 'recompose';
import AuthorMenu from './PostItemAuthorMenu';
import ReaderMenu from './PostItemReaderMenu';
import Editor from '../Editor';
import * as fragments from '../../fragments';

const PostItem = props => (
  <Paper style={{ marginTop: '16px' }}>
    <Box column style={{ padding: '16px' }}>
      <Box
        alignItems="flex-start"
        justifyContent="space-between"
        style={{ marginBottom: '6px' }}
      >
        <Box alignItems="center">
          <UserAvatar user={props.post.author} />
          <Box column style={{ marginLeft: '16px' }}>
            <div>{props.post.author.name}</div>
            <Timestamp>{props.post.createdAt}</Timestamp>
          </Box>
        </Box>
        <OwnedRoute
          renderLeft={() => (
            <AuthorMenu
              onDeletePost={() => props.onDeletePost(props.post)}
              onEditPost={props.onEditPostStart}
            />
          )}
          renderRight={() => <ReaderMenu />}
          userId={props.post.author.id}
        />
      </Box>
      <Branch
        condition={props.isEditingPost}
        renderLeft={() => (
          <Editor
            defaultValue={props.post}
            onSubmit={data => {
              props.onEditPostEnd();
              props.onUpdatePost(data);
            }}
          />
        )}
        renderRight={() => <MultiLineText>{props.post.body}</MultiLineText>}
      />
    </Box>
    <Divider />
    <CommentRoot postId={props.post.id} />
  </Paper>
);

PostItem.propTypes = {
  isEditingPost: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onDeletePost: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onEditPostEnd: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onEditPostStart: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onUpdatePost: PropTypes.func.isRequired,
  post: propType(fragments.PostObject).isRequired,
};

const container = compose(
  withState('isEditingPost', 'setEditingPost', false),
  mapProps(props => ({
    ...props,
    onEditPostStart: () => setTimeout(() => props.setEditingPost(true), 800),
    onEditPostEnd: () => props.setEditingPost(false),
  })),
);

export default container(PostItem);

import MultiLineText from 'common/components/MultiLineText';
import Timestamp from 'common/components/Timestamp';
import injectStyles from 'common/containers/injectStyles';
import findObjectIndex from 'common/data/findObjectIndex';
import update from 'immutability-helper';
import { compose, get } from 'lodash/fp';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import UserAvatar from 'modules/user/components/Avatar';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Box } from 'react-layout-components';
import { withState } from 'recompose';
import AuthorMenu from './CommentsAuthorMenu';
import ReaderMenu from './CommentsReaderMenu';
import * as mutations from '../../mutations';

const CommentsItem = props => (
  <Box className={props.classes.wrapper} justifyContent="space-between">
    <Box style={{ marginTop: '12px' }}>
      <UserAvatar
        size={30}
        style={{ marginRight: '16px' }}
        user={props.comment.author}
      />
      <Box column>
        <Box style={{ fontSize: '14px' }}>
          <span>{props.comment.author.name}</span>&nbsp;
          <MultiLineText>{props.comment.body}</MultiLineText>
        </Box>
        <Box>
          <Timestamp>{props.comment.createdAt}</Timestamp>
        </Box>
      </Box>
    </Box>
    {props.comment.author.id === get('id', props.currentUser)
      ? <AuthorMenu
        className={props.classes.menu}
        onDelete={props.onDelete}
        onEdit={props.onEditStart}
      />
      : <ReaderMenu className={props.classes.menu} />
    }
  </Box>
);

CommentsItem.propTypes = {
  classes: PropTypes.shape({
    menu: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired,
  }).isRequired,
  comment: PropTypes.shape({
    author: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
  onEditStart: PropTypes.func.isRequired,
};

CommentsItem.defaultProps = {
  currentUser: null,
};

const styles = {
  wrapper: {
    '&:hover $menu': {
      opacity: 1,
    },
  },
  menu: {
    opacity: 0,
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },
};

const container = compose(
  injectStyles(styles),
  withCurrentUser,
  graphql(mutations.DeleteComment, {
    props: ({ mutate, ownProps }) => ({
      onDelete: () => mutate({
        optimisticResponse: {
          __typename: 'Mutation',
          deleteComment: {
            __typename: 'Comment',
            id: ownProps.comment.id,
          },
        },
        updateQueries: {
          CommentsOnPost: (prev, { queryVariables }) => {
            if (queryVariables.postId !== ownProps.comment.parentPost.id) return null;
            return update(prev, {
              allComments: {
                $splice: [[findObjectIndex(ownProps.comment.id, prev.allComments), 1]],
              },
            });
          },
        },
        variables: { id: ownProps.comment.id },
      }),
    }),
  }),
  withState('isEditing', 'setEditing', false),
  graphql(mutations.UpdateComment, {
    props: ({ mutate, ownProps }) => ({
      onEditStart: () => ownProps.setEditing(true),
      onEditEnd: data => {
        ownProps.setEditing(false);
        mutate({
          variables: {
            id: ownProps.comment.id,
            ...data,
          },
        });
      },
    }),
  }),
);

export default container(CommentsItem);

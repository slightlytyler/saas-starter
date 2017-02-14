import MultiLineText from 'common/components/MultiLineText';
import Timestamp from 'common/components/Timestamp';
import injectStyles from 'common/containers/injectStyles';
import { propType } from 'graphql-anywhere';
import { compose } from 'lodash/fp';
import OwnedRoute from 'modules/auth/components/OwnedRoute';
import UserAvatar from 'modules/user/components/UserAvatar';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { withState } from 'recompose';
import CommentAuthorMenu from './CommentAuthorMenu';
import CommentReaderMenu from './CommentReaderMenu';
import * as fragments from '../../fragments';

const CommentItem = props => (
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
    <OwnedRoute
      renderLeft={() => (
        <CommentAuthorMenu
          className={props.classes.menu}
          comment={props.comment}
          onDelete={props.onDelete}
        />
      )}
      renderRight={() => <CommentReaderMenu className={props.classes.menu} />}
      userId={props.comment.author.id}
    />
  </Box>
);

CommentItem.propTypes = {
  classes: PropTypes.shape({
    menu: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired,
  }).isRequired,
  comment: propType(fragments.CommentObject).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onDelete: PropTypes.func.isRequired,
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
  withState('isEditing', 'setEditing', false),
);

export default container(CommentItem);

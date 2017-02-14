import MaterialIcon from 'common/components/MaterialIcon';
import { propType } from 'graphql-anywhere';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import React, { PropTypes } from 'react';
import * as fragments from '../../fragments';

const PostItemAuthorMenu = props => (
  <IconMenu
    iconButtonElement={
      <IconButton>
        <MaterialIcon>more_vert</MaterialIcon>
      </IconButton>
    }
  >
    <MenuItem
      leftIcon={<MaterialIcon>mode_edit</MaterialIcon>}
      onTouchTap={() => props.onEditPost(props.post)}
      primaryText="Edit"
    />
    <MenuItem
      leftIcon={<MaterialIcon>shuffle</MaterialIcon>}
      primaryText="Crosspost"
    />
    <MenuItem
      leftIcon={<MaterialIcon>delete</MaterialIcon>}
      onTouchTap={() => props.onDeletePost(props.post)}
      primaryText="Delete"
    />
  </IconMenu>
);

PostItemAuthorMenu.propTypes = {
  onDeletePost: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onEditPost: PropTypes.func.isRequired,
  post: propType(fragments.PostObject).isRequired,
};

export default PostItemAuthorMenu;

import MaterialIcon from 'common/components/MaterialIcon';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import React, { PropTypes } from 'react';

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
      onTouchTap={props.onEditPost}
      primaryText="Edit"
    />
    <MenuItem
      leftIcon={<MaterialIcon>shuffle</MaterialIcon>}
      primaryText="Crosspost"
    />
    <MenuItem
      leftIcon={<MaterialIcon>delete</MaterialIcon>}
      onTouchTap={props.onDeletePost}
      primaryText="Delete"
    />
  </IconMenu>
);

PostItemAuthorMenu.propTypes = {
  onDeletePost: PropTypes.func.isRequired,
  onEditPost: PropTypes.func.isRequired,
};

export default PostItemAuthorMenu;

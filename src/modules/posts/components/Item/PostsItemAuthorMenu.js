import MaterialIcon from 'common/components/MaterialIcon';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import React, { PropTypes } from 'react';

const PostsItemAuthorMenu = props => (
  <IconMenu
    iconButtonElement={
      <IconButton>
        <MaterialIcon>more_vert</MaterialIcon>
      </IconButton>
    }
  >
    <MenuItem
      leftIcon={<MaterialIcon>mode_edit</MaterialIcon>}
      onTouchTap={props.onEdit}
      primaryText="Edit"
    />
    <MenuItem
      leftIcon={<MaterialIcon>shuffle</MaterialIcon>}
      primaryText="Crosspost"
    />
    <MenuItem
      leftIcon={<MaterialIcon>delete</MaterialIcon>}
      onTouchTap={props.onDelete}
      primaryText="Delete"
    />
  </IconMenu>
);

PostsItemAuthorMenu.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default PostsItemAuthorMenu;

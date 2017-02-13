import MaterialIcon from 'common/components/MaterialIcon';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import React, { PropTypes } from 'react';

const CommentItemAuthorMenu = props => (
  <IconMenu
    className={props.className}
    iconButtonElement={
      <IconButton>
        <MaterialIcon color="rgba(0, 0, 0, 0.15)" hoverColor="rgba(0, 0, 0, 0.3)">
          fiber_manual_record
        </MaterialIcon>
      </IconButton>
    }
  >
    <MenuItem
      leftIcon={<MaterialIcon>mode_edit</MaterialIcon>}
      onTouchTap={props.onEdit}
      primaryText="Edit"
    />
    <MenuItem
      leftIcon={<MaterialIcon>delete</MaterialIcon>}
      onTouchTap={props.onDelete}
      primaryText="Delete"
    />
  </IconMenu>
);

CommentItemAuthorMenu.propTypes = {
  className: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

CommentItemAuthorMenu.defaultProps = {
  className: undefined,
};

export default CommentItemAuthorMenu;

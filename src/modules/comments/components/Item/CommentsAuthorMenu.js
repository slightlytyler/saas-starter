import MaterialIcon from 'common/components/MaterialIcon';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import React, { PropTypes } from 'react';

const CommentsItemAuthorMenu = props => (
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

CommentsItemAuthorMenu.propTypes = {
  className: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

CommentsItemAuthorMenu.defaultProps = {
  className: undefined,
};

export default CommentsItemAuthorMenu;

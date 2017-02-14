import MaterialIcon from 'common/components/MaterialIcon';
import { propType } from 'graphql-anywhere';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import React, { PropTypes } from 'react';
import * as fragments from '../../fragments';

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
      primaryText="Edit"
    />
    <MenuItem
      leftIcon={<MaterialIcon>delete</MaterialIcon>}
      onTouchTap={() => props.onDelete(props.comment)}
      primaryText="Delete"
    />
  </IconMenu>
);

CommentItemAuthorMenu.propTypes = {
  className: PropTypes.string,
  comment: propType(fragments.CommentObject).isRequired,
  onDelete: PropTypes.func.isRequired,
};

CommentItemAuthorMenu.defaultProps = {
  className: null,
};

export default CommentItemAuthorMenu;

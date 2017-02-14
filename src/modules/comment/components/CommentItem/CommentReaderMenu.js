import MaterialIcon from 'common/components/MaterialIcon';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import React, { PropTypes } from 'react';

const CommentItemReaderMenu = props => (
  <IconMenu
    className={props.className}
    iconButtonElement={
      <IconButton>
        <MaterialIcon>more_vert</MaterialIcon>
      </IconButton>
    }
  >
    <MenuItem
      leftIcon={<MaterialIcon>rss_feed</MaterialIcon>}
      primaryText="Share"
    />
    <MenuItem
      leftIcon={<MaterialIcon>error</MaterialIcon>}
      primaryText="Report"
    />
  </IconMenu>
);

CommentItemReaderMenu.propTypes = {
  className: PropTypes.string,
};

CommentItemReaderMenu.defaultProps = {
  className: null,
};


export default CommentItemReaderMenu;

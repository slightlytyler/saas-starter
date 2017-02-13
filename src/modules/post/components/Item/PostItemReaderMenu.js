import MaterialIcon from 'common/components/MaterialIcon';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import React from 'react';

const PostItemReaderMenu = () => (
  <IconMenu
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

export default PostItemReaderMenu;

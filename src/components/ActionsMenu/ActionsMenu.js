import { reduce } from 'lodash/fp';
import { FloatingActionButton, FontIcon, IconMenu, MenuItem } from 'material-ui';
import React, { PropTypes } from 'react';

const renderItem = item => (
  <MenuItem
    key={item.id}
    onTouchTap={item.action}
    primaryText={item.label}
    style={item.style}
  />
);

const applyItem = (acc, item) => [...acc, renderItem(item)];

const renderItemsIteratee = (acc, item) => (!item.disabled ? applyItem(acc, item) : acc);

const renderItems = reduce(renderItemsIteratee, []);

const ActionsMenu = ({ items }) => (
  <IconMenu
    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    iconButtonElement={
      <FloatingActionButton mini secondary zDepth={1}>
        <FontIcon className="material-icons">more_vert</FontIcon>
      </FloatingActionButton>
    }
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
  >
    {renderItems(items)}
  </IconMenu>
);

ActionsMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
  })).isRequired,
};

export default ActionsMenu;

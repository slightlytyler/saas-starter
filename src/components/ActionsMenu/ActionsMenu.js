import { reduce } from 'lodash/fp';
import { IconMenu } from 'material-ui';
import React, { PropTypes } from 'react';
import Item from './ActionsMenuItem';
import MoreButton from '../MoreButton';

const renderItemsIteratee = (acc, item) => (
  item.disabled
    ? acc
    : [...acc, <Item {...item} key={item.id} />]
);

const renderItems = reduce(renderItemsIteratee, []);

const ActionsMenu = ({ items }) => (
  <IconMenu
    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    iconButtonElement={<MoreButton />}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
  >
    {renderItems(items)}
  </IconMenu>
);

ActionsMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionsMenu;

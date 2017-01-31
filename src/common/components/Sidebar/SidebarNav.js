import { capitalize, compose, head, map, split, trimChars } from 'lodash/fp';
import { List, ListItem, makeSelectable } from 'material-ui';
import React, { PropTypes } from 'react';
import MaterialIcon from '../MaterialIcon';

const SelectableList = makeSelectable(List);

const getValueFromUrl = compose(head, split('/'), trimChars('/'));

// eslint-disable-next-line react/prop-types
const renderItemsIteratee = ({ icon, label, onTouchTap, value }) => (
  <ListItem
    key={value}
    leftIcon={<MaterialIcon>{icon}</MaterialIcon>}
    onTouchTap={onTouchTap}
    primaryText={label || capitalize(value)}
    value={value}
  />
);

const renderItems = map(renderItemsIteratee);

const SidebarNav = ({ items, url }) => (
  <SelectableList style={{ width: '100%' }} value={getValueFromUrl(url)}>
    {renderItems(items)}
  </SelectableList>
);

SidebarNav.propTypes = {
  items: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
};

export default SidebarNav;

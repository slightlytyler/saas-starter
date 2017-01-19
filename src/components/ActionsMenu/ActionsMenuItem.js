import { capitalize } from 'lodash/fp';
import { MenuItem } from 'material-ui';
import React, { PropTypes } from 'react';
import { toClass } from 'recompose';

const ActionsMenuItem = ({ action, id, label, style }) => (
  <MenuItem
    key={id}
    onTouchTap={action}
    primaryText={label || capitalize(id)}
    style={style}
  />
);

ActionsMenuItem.propTypes = {
  action: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  style: PropTypes.object,
};

ActionsMenuItem.defaultProps = {
  label: undefined,
  style: undefined,
};

export default toClass(ActionsMenuItem);

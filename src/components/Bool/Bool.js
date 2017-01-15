import colors from 'colors';
import { FontIcon } from 'material-ui';
import React, { PropTypes } from 'react';

const selectColor = value => (value ? colors.green50 : colors.red50);

const selectIcon = value => (value ? 'done' : 'clear');

const Bool = ({ value }) => (
  <FontIcon className="material-icons" color={selectColor(value)}>
    {selectIcon(value)}
  </FontIcon>
);

Bool.propTypes = {
  value: PropTypes.bool,
};

Bool.defaultProps = {
  value: false,
};

export default Bool;

import cx from 'classnames';
import { FontIcon } from 'material-ui';
import React, { PropTypes } from 'react';

const MaterialIcon = ({ children, className, ...props }) => (
  <FontIcon className={cx('material-icons', className)} {...props}>
    {children}
  </FontIcon>
);

MaterialIcon.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

MaterialIcon.defaultProps = {
  className: undefined,
};

export default MaterialIcon;

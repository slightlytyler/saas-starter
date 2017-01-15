import logo from 'assets/images/logo.png';
import logoInverted from 'assets/images/logo--inverted.png';
import cx from 'classnames';
import React, { PropTypes } from 'react';

const Logo = ({ className, inverted }) => (
  <img
    alt=""
    className={cx('Logo', className)}
    src={inverted ? logoInverted : logo}
  />
);

Logo.propTypes = {
  className: PropTypes.string,
  inverted: PropTypes.bool,
};

Logo.defaultProps = {
  className: null,
  inverted: false,
};

export default Logo;

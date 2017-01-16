import cx from 'classnames';
import React, { PropTypes } from 'react';

const FitContainer = ({ className, ...props }) => (
  <div className={cx('FitContainer', className)} {...props} />
);

FitContainer.propTypes = {
  className: PropTypes.string,
};

FitContainer.defaultProps = {
  className: null,
};

export default FitContainer;

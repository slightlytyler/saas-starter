import cx from 'classnames';
import { RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';

const SubmitButton = ({ className, label, ...props }) => (
  <RaisedButton
    {...props}
    className={cx('SubmitButton', className)}
    fullWidth
    label={label}
    primary
    type="submit"
  />
);

SubmitButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
};

SubmitButton.defaultProps = {
  className: undefined,
};

export default SubmitButton;

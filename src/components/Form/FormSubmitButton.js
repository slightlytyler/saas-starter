import cx from 'classnames';
import { CircularProgress, RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';

const renderSpinner = () => (
  <Box center fit>
    <CircularProgress size={25} />
  </Box>
);

const FormSubmitButton = ({ className, label, loading, ...props }) => (
  <RaisedButton
    {...props}
    className={cx('FormSubmitButton', className)}
    disabled={loading}
    label={loading ? null : label}
    primary
    type="submit"
  >
    {loading ? renderSpinner() : null}
  </RaisedButton>
);

FormSubmitButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

FormSubmitButton.defaultProps = {
  className: undefined,
  loading: false,
};

export default FormSubmitButton;

import cx from 'classnames';
import injectStyles from 'common/containers/injectStyles';
import { CircularProgress, RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';

const renderSpinner = () => (
  <Box center fit>
    <CircularProgress size={25} />
  </Box>
);

const FormSubmitButton = ({ classes, className, label, loading, ...props }) => (
  <RaisedButton
    {...props}
    className={cx(className, classes.root)}
    disabled={loading}
    label={loading ? null : label}
    primary
    type="submit"
  >
    {loading ? renderSpinner() : null}
  </RaisedButton>
);

FormSubmitButton.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

FormSubmitButton.defaultProps = {
  className: undefined,
  loading: false,
};

const styles = {
  root: {
    marginBottom: '1em',
    marginTop: '2em',
  },
};

const container = injectStyles(styles);

export default container(FormSubmitButton);

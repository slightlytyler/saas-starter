import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';

const SubmitButton = ({ label }) => (
  <RaisedButton
    label={label}
    primary
    type="submit"
  />
);

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default SubmitButton;

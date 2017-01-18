import { capitalize } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Field as FormalField } from 'react-formal';

const Field = ({ floatingLabelText, name, ...props }) => (
  <FormalField
    {...props}
    floatingLabelText={floatingLabelText || capitalize(name)}
    name={name}
  />
);

Field.propTypes = {
  floatingLabelText: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Field.defaultProps = {
  floatingLabelText: null,
};

Field.componentName = 'Field';

export default Field;

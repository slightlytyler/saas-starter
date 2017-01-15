import { FloatingActionButton, FontIcon } from 'material-ui';
import React, { PropTypes } from 'react';

const CreateButton = ({ onClick }) => (
  <FloatingActionButton mini onClick={onClick}>
    <FontIcon className="material-icons">add</FontIcon>
  </FloatingActionButton>
);

CreateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CreateButton;

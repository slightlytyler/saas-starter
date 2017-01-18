import { FloatingActionButton, FontIcon } from 'material-ui';
import React, { PropTypes } from 'react';

const CreateButton = ({ onTouchTap }) => (
  <FloatingActionButton mini onTouchTap={onTouchTap}>
    <FontIcon className="material-icons">add</FontIcon>
  </FloatingActionButton>
);

CreateButton.propTypes = {
  onTouchTap: PropTypes.func.isRequired,
};

export default CreateButton;

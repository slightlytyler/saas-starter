import MaterialIcon from 'common/components/MaterialIcon';
import { IconMenu, MenuItem, RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';

const RoutesRecordBuilderAddStepButton = ({ disabled }) => (
  <IconMenu
    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    iconButtonElement={
      <RaisedButton
        disabled={disabled}
        label="Add Step"
        primary
        style={{
          marginTop: '2rem',
          width: '15rem',
        }}
      />
    }
  >
    <MenuItem
      leftIcon={<MaterialIcon>layers</MaterialIcon>}
      primaryText="Operation"
      value="operation"
    />
    <MenuItem
      leftIcon={<MaterialIcon>share</MaterialIcon>}
      primaryText="Conditional"
      value="conditional"
    />
  </IconMenu>
);

RoutesRecordBuilderAddStepButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default RoutesRecordBuilderAddStepButton;

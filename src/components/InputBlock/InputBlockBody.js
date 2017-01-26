import React, { PropTypes } from 'react';
import Collapse from 'react-collapse';
import { Box } from 'react-layout-components';

const InputBlockBody = ({ children, disabled, open }) => {
  if (disabled) return false;
  return (
    <Collapse isOpened={open}>
      <Box className="InputBlockBody" column>
        {children()}
      </Box>
    </Collapse>
  );
};

InputBlockBody.propTypes = {
  children: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
};

export default InputBlockBody;

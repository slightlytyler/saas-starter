import React, { PropTypes } from 'react';

const InputBlockHeader = ({ children, className }) => (
  <Box className={cx('InputBlockHeader', className)} column>
    {children}
  </Box>
);

InputBlockHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default InputBlockHeader;

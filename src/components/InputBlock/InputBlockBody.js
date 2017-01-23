import cx from 'classnames';
import React, { PropTypes } from 'react';
import Collapse from 'react-collapse';
import { Box } from 'react-layout-components';

const InputBlockBody = ({ children, className, expand }) => (
  <Collapse isOpened={expand}>
    <Box className={cx('InputBlockBody', className, { expand })} column>
      {children}
    </Box>
  </Collapse>
);

InputBlockBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  expand: PropTypes.bool.isRequired,
};

InputBlockBody.defaultProps = {
  className: undefined,
};

export default InputBlockBody;

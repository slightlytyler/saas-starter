import cx from 'classnames';
import { Paper } from 'material-ui';
import React, { PropTypes } from 'react';

const Panel = ({ children, className, fit, zDepth }) => (
  <Paper className={cx('Panel', className, { fit })} zDepth={zDepth}>
    {children}
  </Paper>
);

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fit: PropTypes.bool,
  zDepth: PropTypes.number,
};

Panel.defaultProps = {
  className: undefined,
  fit: false,
  zDepth: 0,
};

export default Panel;

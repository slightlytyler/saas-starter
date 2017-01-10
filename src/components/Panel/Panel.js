import cx from 'classnames';
import { Paper } from 'material-ui';
import React, { PropTypes } from 'react';

const Panel = ({ children, className }) => (
  <Paper className={cx('Panel', className)} zDepth={1}>
    {children}
  </Paper>
);

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Panel.defaultProps = {
  className: undefined,
};

export default Panel;

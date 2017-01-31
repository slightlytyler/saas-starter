import cx from 'classnames';
import { TableBody } from 'material-ui';
import React, { PropTypes } from 'react';

const DataTableBody = ({ className, ...props }) => (
  <TableBody
    {...props}
    className={cx('DataTableBody', className)}
  />
);

DataTableBody.propTypes = {
  className: PropTypes.string,
};

DataTableBody.defaultProps = {
  className: undefined,
};

DataTableBody.muiName = TableBody.muiName;

export default DataTableBody;

import cx from 'classnames';
import { TableRow } from 'material-ui';
import React, { PropTypes } from 'react';

const DataTableRow = ({ className, ...props }) => (
  <TableRow
    {...props}
    className={cx('DataTableRow', className)}
    hoverable
  />
);

DataTableRow.propTypes = {
  className: PropTypes.string,
};

DataTableRow.defaultProps = {
  className: null,
};

DataTableRow.muiName = TableRow.muiName;

export default DataTableRow;

import cx from 'classnames';
import { TableRow } from 'material-ui';
import React, { PropTypes } from 'react';

const DataTableRow = ({ className, hoverable, ...props }) => (
  <TableRow
    {...props}
    className={cx('DataTableRow', className)}
    hoverable={hoverable}
  />
);

DataTableRow.propTypes = {
  className: PropTypes.string,
  hoverable: PropTypes.bool,
};

DataTableRow.defaultProps = {
  className: null,
  hoverable: true,
};

DataTableRow.muiName = TableRow.muiName;

export default DataTableRow;

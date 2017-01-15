import cx from 'classnames';
import { TableHeader } from 'material-ui';
import React, { PropTypes } from 'react';
import TableRow from './DataTableRow';

const DataTableHeader = ({ children, className, ...props }) => (
  <TableHeader
    {...props}
    adjustForCheckbox={false}
    className={cx('DataTableHeader', className)}
    displaySelectAll={false}
  >
    <TableRow>
      {children}
    </TableRow>
  </TableHeader>
);

DataTableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DataTableHeader.defaultProps = {
  className: null,
};

DataTableHeader.muiName = TableHeader.muiName;

export default DataTableHeader;

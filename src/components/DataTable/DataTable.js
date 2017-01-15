import cx from 'classnames';
import { Table } from 'material-ui';
import React, { PropTypes } from 'react';

const DataTable = ({ className, ...props }) => (
  <Table
    {...props}
    className={cx('DataTable', className)}
  />
);

DataTable.propTypes = {
  className: PropTypes.string,
};

DataTable.defaultProps = {
  className: null,
};

DataTable.muiName = Table.muiName;

export default DataTable;

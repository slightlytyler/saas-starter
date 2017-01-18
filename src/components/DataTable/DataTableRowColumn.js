import cx from 'classnames';
import { TableRowColumn } from 'material-ui';
import React, { PropTypes } from 'react';

const DataTableRowColumn = ({ actions, className, icon, ...props }) => (
  <TableRowColumn
    {...props}
    className={cx(
      'DataTableRowColumn',
      className,
      { actions, icon },
    )}
  />
);

DataTableRowColumn.propTypes = {
  actions: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.bool,
};

DataTableRowColumn.defaultProps = {
  actions: false,
  className: undefined,
  icon: false,
};

DataTableRowColumn.muiName = TableRowColumn.muiName;

export default DataTableRowColumn;

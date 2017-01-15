import cx from 'classnames';
import { TableHeaderColumn } from 'material-ui';
import React, { PropTypes } from 'react';

const DataTableHeaderColumn = ({ actions, className, icon, ...props }) => (
  <TableHeaderColumn
    {...props}
    className={cx(
      'DataTableHeaderColumn',
      className,
      { actions, icon },
    )}
  />
);

DataTableHeaderColumn.propTypes = {
  actions: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.bool,
};

DataTableHeaderColumn.defaultProps = {
  actions: false,
  className: null,
  icon: false,
};

DataTableHeaderColumn.muiName = TableHeaderColumn.muiName;

export default DataTableHeaderColumn;

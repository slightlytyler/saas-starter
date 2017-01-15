import cx from 'classnames';
import AutoSizer from 'components/AutoSizer';
import { Paper, Table } from 'material-ui';
import React, { PropTypes } from 'react';

const DataTable = ({ className, ...props }) => (
  <AutoSizer>
    {({ height }) => (
      <Paper zDepth={0}>
        <Table
          {...props}
          className={cx('DataTable', className)}
          height={`${height - 57}px`}
        />
      </Paper>
    )}
  </AutoSizer>
);

DataTable.propTypes = {
  className: PropTypes.string,
};

DataTable.defaultProps = {
  className: null,
};

DataTable.muiName = Table.muiName;

export default DataTable;

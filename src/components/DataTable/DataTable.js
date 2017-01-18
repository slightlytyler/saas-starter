import cx from 'classnames';
import findChild from 'common/react/findChild';
import omitProps from 'containers/omitProps';
import withParentDimensions from 'containers/withParentDimensions';
import { compose, keys, map } from 'lodash/fp';
import { Paper, Table } from 'material-ui';
import React, { PropTypes } from 'react';
import TableBody from './DataTableBody';
import TableRowEmpty from './DataTableRowEmpty';

const renderEmptyRows = () => map(
  el => (
    <TableRowEmpty key={`TableRowEmpty[${el}]`} />
  ),
  compose(keys, Array)(10),
);

const renderEmptyBody = () => (
  <TableBody key="TableBodyEmpty">
    {renderEmptyRows()}
  </TableBody>
);

const renderEmptyState = children => ([
  findChild(child => child.type.muiName === 'TableHeader', children),
  renderEmptyBody(),
]);

const DataTable = ({ children, className, height, loading, ...props }) => (
  <Paper zDepth={0}>
    <Table
      {...props}
      className={cx('DataTable', className)}
      height={`${height - 57}px`}
    >
      {loading ? renderEmptyState(children) : children}
    </Table>
  </Paper>
);

DataTable.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  height: PropTypes.number.isRequired,
  loading: PropTypes.bool,
};

DataTable.defaultProps = {
  className: undefined,
  loading: false,
};

DataTable.muiName = Table.muiName;

export default compose(
  withParentDimensions,
  omitProps('width'),
)(DataTable);

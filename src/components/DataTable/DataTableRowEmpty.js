import React from 'react';
import TableRow from './DataTableRow';
import TableRowColumn from './DataTableRowColumn';

const DataTableRowEmpty = () => (
  <TableRow className="empty">
    <TableRowColumn>
      <div className="placeholder" />
    </TableRowColumn>
  </TableRow>
);

export default DataTableRowEmpty;

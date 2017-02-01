import Bool from 'common/components/Bool';
import DataTable from 'common/components/DataTable';
import React, { PropTypes } from 'react';
import ActionsMenu from './RoutesTableRowActionsMenu';
import withRecord from '../../containers/withRecord';

const RoutesTableRow = ({ record, onDelete, onEdit }) => {
  if (record.deleted) return false;
  return (
    <DataTable.Row>
      <DataTable.RowColumn icon>
        <Bool value={record.body.enabled} />
      </DataTable.RowColumn>
      <DataTable.RowColumn>
        {record.body.name}
      </DataTable.RowColumn>
      <DataTable.RowColumn>
        {record.body.status}
      </DataTable.RowColumn>
      <DataTable.RowColumn actions>
        <ActionsMenu
          id={record.body.id}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </DataTable.RowColumn>
    </DataTable.Row>
  );
};

RoutesTableRow.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
};

const container = withRecord({ fetchEvents: false });

export default container(RoutesTableRow);

import Bool from 'common/components/Bool';
import DataTable from 'common/components/DataTable';
import React, { PropTypes } from 'react';
import ActionsMenu from './AdaptersTableRowActionsMenu';
import withRecord from '../../containers/withRecord';

const renderStatus = status => (
  status === 'Creating image'
    ? <div>Loading</div>
    : status
);

const AdaptersTableRow = ({ record, onEdit }) => {
  if (record.deleted) return false;
  return (
    <DataTable.Row>
      <DataTable.RowColumn icon>
        <Bool value={record.body.enabled} />
      </DataTable.RowColumn>
      <DataTable.RowColumn icon>
        <Bool value={record.body.global} />
      </DataTable.RowColumn>
      <DataTable.RowColumn>
        {record.body.name}
      </DataTable.RowColumn>
      <DataTable.RowColumn>
        {renderStatus(record.body.status)}
      </DataTable.RowColumn>
      <DataTable.RowColumn actions>
        <ActionsMenu id={record.body.id} onEdit={onEdit} />
      </DataTable.RowColumn>
    </DataTable.Row>
  );
};

AdaptersTableRow.propTypes = {
  onEdit: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
};

export default withRecord({ fetchEvents: false })(AdaptersTableRow);

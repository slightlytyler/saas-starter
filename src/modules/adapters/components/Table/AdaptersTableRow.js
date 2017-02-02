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

const AdaptersTableRow = ({ record, onDelete, onEdit }) => {
  if (record.deleted) return false;
  return (
    <DataTable.Row onTouchTap={onEdit}>
      <DataTable.RowColumn icon>
        <Bool value={record.body.enabled} />
      </DataTable.RowColumn>
      <DataTable.RowColumn icon>
        <Bool value={record.body.global} />
      </DataTable.RowColumn>
      <DataTable.RowColumn style={{ width: '20rem' }}>
        {record.body.name}
      </DataTable.RowColumn>
      <DataTable.RowColumn>
        {renderStatus(record.body.status)}
      </DataTable.RowColumn>
      <DataTable.RowColumn actions>
        <ActionsMenu onDelete={onDelete} onEdit={onEdit} />
      </DataTable.RowColumn>
    </DataTable.Row>
  );
};

AdaptersTableRow.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
};

const container = withRecord({ fetchEvents: false });

export default container(AdaptersTableRow);

import Bool from 'components/Bool';
import DataTable from 'components/DataTable';
import React, { PropTypes } from 'react';
import ActionsMenu from './AdaptersTableRowActionsMenu';
import withRecord from '../../containers/withRecord';

const renderStatus = status => (
  status === 'Creating image'
    ? <div>Loading</div>
    : status
);

const AdaptersTableRow = ({ record }) => {
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
        <ActionsMenu id={record.body.id} />
      </DataTable.RowColumn>
    </DataTable.Row>
  );
};

AdaptersTableRow.propTypes = {
  record: PropTypes.object.isRequired,
};

export default withRecord({ fetchEvents: false })(AdaptersTableRow);

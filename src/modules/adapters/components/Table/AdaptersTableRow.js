import Bool from 'components/Bool';
import { DataTableRow, DataTableRowColumn } from 'components/DataTable';
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
    <DataTableRow>
      <DataTableRowColumn icon>
        <Bool value={record.body.enabled} />
      </DataTableRowColumn>
      <DataTableRowColumn icon>
        <Bool value={record.body.global} />
      </DataTableRowColumn>
      <DataTableRowColumn>{record.body.name}</DataTableRowColumn>
      <DataTableRowColumn>{renderStatus(record.body.status)}</DataTableRowColumn>
      <DataTableRowColumn actions>
        <ActionsMenu id={record.body.id} />
      </DataTableRowColumn>
    </DataTableRow>
  );
};

AdaptersTableRow.propTypes = {
  record: PropTypes.object.isRequired,
};

export default withRecord(AdaptersTableRow);
